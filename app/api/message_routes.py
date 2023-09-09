from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Message, User, db
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)

# creates validation errors format
def validation_errors_to_error_messages(validation_errors):
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages



@message_routes.route('')
@login_required
def get_all_messages():
    if current_user.to_dict()["role"] != "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    all_messages = Message.query.all()

    res = {}
    # messages = [message.to_dict() for message in all_messages]
    for message in all_messages:
        current_message = message.to_dict()

        if message.admin:
            current_message["Admin"] = message.admin.to_dict()
    
        if message.customer:
            current_message["Customer"] = message.customer.to_dict()

        if res.get(current_message["customer_id"]) == None:
            res[current_message["customer_id"]] = [current_message]
        else:
            res[current_message["customer_id"]].append(current_message)


    return {"Messages": res}


# ***********************************************


@message_routes.route('/users/<int:id>')
@login_required
def get_all_customer_messages(id):

    if current_user.to_dict()["role"] == "admin":
        pass
    elif current_user.to_dict()["id"] != id:
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    all_messages = Message.query.filter(Message.customer_id == str(id)).all()

    res = []
    # messages = [message.to_dict() for message in all_messages]
    for message in all_messages:
        current_message = message.to_dict()

        # if message.admin:
        #     current_message["Admin"] = message.admin.to_dict()
    
        # if message.customer:
        #     current_message["Customer"] = message.customer.to_dict()

        res.append(current_message)


    return {"Messages": res}





# ***********************************************







# ***********************************************




@message_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_message_by_id(id):
    message = Message.query.get(id)
    if not message:
        return jsonify({"message": "Message not found"}), 404
    return message.to_dict()


# ***********************************************



@message_routes.route('', methods=["POST"])
@login_required
def create_customer_message():
    if current_user.to_dict()["role"] == "admin":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_message = Message(
            customer_id=current_user.get_id(),
            admin_id="2",
            message=data["message"],
        )
        db.session.add(new_message)
        db.session.commit()

        return new_message.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400




# ***********************************************



@message_routes.route('/users/<int:id>', methods=["POST"])
@login_required
def create_admin_message(id):

    if current_user.to_dict()["role"] != "admin" or str(id) == "2":
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401

    customer = User.query.get(id)

    if customer is None:
        return jsonify({"message": "Customer not found"}), 404

    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        print("validated*************************")
        data = form.data
        new_message = Message(
            customer_id=customer.to_dict()["id"],
            admin_id="2",
            message=data["message"],
        )
        db.session.add(new_message)
        db.session.commit()

        return new_message.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# *****************************************


@message_routes.route("/<int:id>", methods=["PUT", "PATCH"])
@login_required
def edit_message(id):
    form = MessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    message = Message.query.get(id)

    if message is None:
        return jsonify({"message": "Message not found"}), 404
    if str(message.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    if form.validate_on_submit():
        data = form.data
        message.message = data["message"]
        db.session.commit()
        return message.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400



# ***********************************************


@message_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_a_message(id):
    message = Message.query.get(id)
    if message is None:
        return jsonify({"message": "Message not found"}), 404
    if str(message.user_id) != current_user.get_id():
        return {"errors": [{"Unauthorized": "Unauthorized Action"}]}, 401
    db.session.delete(message)
    db.session.commit()
    return jsonify({"message": "Message succesfully deleted!"}), 200