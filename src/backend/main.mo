import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Use with clause for migration!

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type Address = {
    street : Text;
    city : Text;
    state : Text;
    zip : Text;
    country : Text;
  };

  public type PaymentMethod = {
    #creditCard : Text; // credit card id
    #paypal : Text; // paypal id
    #bankTransfer : Text; // iban number
    #cashOnDelivery;
  };

  public type UserProfile = {
    displayName : Text;
    phoneNumber : ?Text;
    role : {
      #buyer;
      #seller;
    };
    shippingAddress : ?Address;
    paymentMethods : [PaymentMethod];
  };

  public type Product = {
    id : Nat;
    name : Text;
    price : Nat;
    imageUrl : Text;
    sellerPrincipal : Principal;
    createdAt : Time.Time;
  };

  public type Order = {
    id : Nat;
    buyerPrincipal : Principal;
    buyerProfileSnapshot : UserProfile;
    productSnapshot : Product;
    shippingAddress : Address;
    paymentMethod : PaymentMethod;
    createdAt : Time.Time;
  };

  let users = Map.empty<Principal, UserProfile>();
  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  var nextProductId = 0;
  var nextOrderId = 0;

  // User Profile Management
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  // Product Management
  public shared ({ caller }) func createProduct(name : Text, price : Nat, imageUrl : Text) : async Product {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create products");
    };

    let roleCheck = users.get(caller);
    switch (roleCheck) {
      case (null) { Runtime.trap("Unauthorized: Only sellers can create products") };
      case (?roleCheck) {
        switch (roleCheck.role) {
          case (#buyer) { Runtime.trap("Unauthorized: Only sellers can create products") };
          case (#seller) {};
        };
      };
    };

    let newProduct : Product = {
      id = nextProductId;
      name;
      price;
      imageUrl;
      sellerPrincipal = caller;
      createdAt = Time.now();
    };
    products.add(nextProductId, newProduct);
    nextProductId += 1;
    newProduct;
  };

  public query ({ caller }) func listAllProducts() : async [Product] {
    // Public marketplace - accessible to everyone including guests
    products.values().toArray();
  };

  public query ({ caller }) func listMyProducts() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their products");
    };
    products.values().filter(func(p) { p.sellerPrincipal == caller }).toArray();
  };

  // Order Management
  public shared ({ caller }) func createOrder(
    productId : Nat,
    shippingAddress : Address,
    paymentMethod : PaymentMethod,
  ) : async Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let roleCheck = users.get(caller);
    switch (roleCheck) {
      case (null) { Runtime.trap("Unauthorized: Must be a registered buyer to place orders") };
      case (?roleCheck) {
        switch (roleCheck.role) {
          case (#seller) { Runtime.trap("Unauthorized: Only buyers can place orders") };
          case (#buyer) {};
        };
      };
    };

    let product = switch (products.get(productId)) {
      case (null) { Runtime.trap("Invalid product ID") };
      case (?product) { product };
    };

    // Prevent buyers from ordering their own products (if they somehow have seller role too)
    if (product.sellerPrincipal == caller) {
      Runtime.trap("Unauthorized: Cannot order your own products");
    };

    let buyerProfileSnapshot = switch (users.get(caller)) {
      case (null) { Runtime.trap("Buyer profile not found") };
      case (?profile) { profile };
    };

    let newOrder : Order = {
      id = nextOrderId;
      buyerPrincipal = caller;
      buyerProfileSnapshot;
      productSnapshot = product;
      shippingAddress;
      paymentMethod;
      createdAt = Time.now();
    };
    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;
    newOrder;
  };

  public query ({ caller }) func listMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their orders");
    };

    let roleCheck = users.get(caller);
    switch (roleCheck) {
      case (null) { Runtime.trap("Unauthorized: Must be a registered buyer to view orders") };
      case (?roleCheck) {
        switch (roleCheck.role) {
          case (#seller) { Runtime.trap("Unauthorized: Only buyers can view their orders") };
          case (#buyer) {};
        };
      };
    };

    orders.values().filter(func(o) { o.buyerPrincipal == caller }).toArray();
  };

  public query ({ caller }) func listOrdersForMyProducts() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders for their products");
    };

    let roleCheck = users.get(caller);
    switch (roleCheck) {
      case (null) { Runtime.trap("Unauthorized: Must be a registered seller to view product orders") };
      case (?roleCheck) {
        switch (roleCheck.role) {
          case (#buyer) { Runtime.trap("Unauthorized: Only sellers can view orders for their products") };
          case (#seller) {};
        };
      };
    };

    orders.values().filter(func(o) { o.productSnapshot.sellerPrincipal == caller }).toArray();
  };
};
