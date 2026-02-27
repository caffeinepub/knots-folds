import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    stockQuantity : Nat;
    imageUrl : Text;
    category : Text;
  };

  type Order = {
    id : Nat;
    customerName : Text;
    phone : Text;
    address : Text;
    productId : Nat;
    quantity : Nat;
    status : OrderStatus;
    timestamp : Int;
  };

  type OrderStatus = {
    #pending;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  module ContactMessage {
    public func compare(msg1 : ContactMessage, msg2 : ContactMessage) : Order.Order {
      if (msg1.timestamp < msg2.timestamp) { return #less };
      if (msg1.timestamp > msg2.timestamp) { return #greater };
      Text.compare(msg1.email, msg2.email);
    };
  };

  module ContactMessageFilter {
    public func matchesQuery(msg : ContactMessage, searchText : Text) : Bool {
      let lowercaseQuery = searchText.toLower();
      msg.name.toLower().contains(#text lowercaseQuery) or msg.email.toLower().contains(#text lowercaseQuery) or msg.message.toLower().contains(#text lowercaseQuery);
    };
  };

  let products = Map.empty<Nat, Product>();
  let orders = Map.empty<Nat, Order>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  var nextProductId = 0;
  var nextOrderId = 0;
  var nextMessageId = 0;

  // User profile functions (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func assignRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func getMyRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  // Product CRUD
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Float, stockQuantity : Nat, imageUrl : Text, category : Text) : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let product = {
      id = nextProductId;
      name;
      description;
      price;
      stockQuantity;
      imageUrl;
      category;
    };

    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found.") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func updateProduct(productId : Nat, name : Text, description : Text, price : Float, stockQuantity : Nat, imageUrl : Text, category : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found.") };
      case (?existing) {
        let updatedProduct = {
          existing with
          name;
          description;
          price;
          stockQuantity;
          imageUrl;
          category;
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(productId)) {
      Runtime.trap("Product does not exist, cannot delete.") : ();
    };
    products.remove(productId);
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  // Orders
  public shared ({ caller }) func placeOrder(customerName : Text, phone : Text, address : Text, productId : Nat, quantity : Nat) : async Nat {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found.") };
      case (?_product) {};
    };

    let order = {
      id = nextOrderId;
      customerName;
      phone;
      address;
      productId;
      quantity;
      status = #pending;
      timestamp = Time.now();
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found.") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found.") };
      case (?existing) {
        let updatedOrder = { existing with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  // Contact/Feedback
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let contactMessage = {
      id = nextMessageId;
      name;
      email;
      message;
      timestamp = Time.now();
    };

    contactMessages.add(nextMessageId, contactMessage);
    nextMessageId += 1;
  };

  public shared ({ caller }) func deleteContactMessage(msgId : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    if (not contactMessages.containsKey(msgId)) {
      Runtime.trap("Message does not exist, cannot delete.") : ();
    };
    contactMessages.remove(msgId);
  };

  public query ({ caller }) func getContactMessage(msgId : Nat) : async ContactMessage {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    switch (contactMessages.get(msgId)) {
      case (null) { Runtime.trap("Message not found.") };
      case (?msg) { msg };
    };
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all contact messages");
    };
    contactMessages.values().toArray().sort();
  };

  public query ({ caller }) func searchContactMessages(searchText : Text) : async [ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can search contact messages");
    };
    contactMessages.values().toArray().filter(func(message) { ContactMessageFilter.matchesQuery(message, searchText) });
  };
};
