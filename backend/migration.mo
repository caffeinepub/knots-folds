import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldActor = {
    contactMessages : Map.Map<Nat, { id : Nat; name : Text; email : Text; message : Text; timestamp : Int }>;
    nextMessageId : Nat;
  };

  type NewActor = {
    products : Map.Map<Nat, {
      id : Nat;
      name : Text;
      description : Text;
      price : Float;
      stockQuantity : Nat;
      imageUrl : Text;
      category : Text;
    }>;
    orders : Map.Map<Nat, {
      id : Nat;
      customerName : Text;
      phone : Text;
      address : Text;
      productId : Nat;
      quantity : Nat;
      status : { #pending; #processing; #shipped; #delivered; #cancelled };
      timestamp : Int;
    }>;
    contactMessages : Map.Map<Nat, { id : Nat; name : Text; email : Text; message : Text; timestamp : Int }>;
    nextProductId : Nat;
    nextOrderId : Nat;
    nextMessageId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    {
      products = Map.empty<Nat, {
        id : Nat;
        name : Text;
        description : Text;
        price : Float;
        stockQuantity : Nat;
        imageUrl : Text;
        category : Text;
      }>();
      orders = Map.empty<Nat, {
        id : Nat;
        customerName : Text;
        phone : Text;
        address : Text;
        productId : Nat;
        quantity : Nat;
        status : { #pending; #processing; #shipped; #delivered; #cancelled };
        timestamp : Int;
      }>();
      contactMessages = old.contactMessages;
      nextProductId = 0;
      nextOrderId = 0;
      nextMessageId = old.nextMessageId;
    };
  };
};
