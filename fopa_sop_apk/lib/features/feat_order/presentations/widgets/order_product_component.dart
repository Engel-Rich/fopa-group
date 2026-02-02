import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';

class OrderProductComponent extends StatefulWidget {
  final ProductResponseModel product;
  final int quantity;
  final ValueChanged<int> onQuantityChanged;
  final VoidCallback onRemove;

  const OrderProductComponent({
    super.key,
    required this.product,
    required this.quantity,
    required this.onQuantityChanged,
    required this.onRemove,
  });

  @override
  State<OrderProductComponent> createState() => _OrderProductComponentState();
}

class _OrderProductComponentState extends State<OrderProductComponent> {
  late TextEditingController _quantityController;

  @override
  void initState() {
    super.initState();
    _quantityController = TextEditingController(
      text: widget.quantity.toString(),
    );
  }

  @override
  void didUpdateWidget(OrderProductComponent oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.quantity != widget.quantity) {
      _quantityController.text = widget.quantity.toString();
    }
  }

  @override
  void dispose() {
    _quantityController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 3,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SimpleText(
                text: widget.product.name,
                size: 16,
                weight: FontWeight.bold,
                color: context.titleLargeColor,
              ),
              spacerHeight(4),
              SimpleText(
                text: "${widget.product.price.toInt()} FCFA",
                size: 14,
                color: context.titleLargeColor,
              ),
            ],
          ),
        ),
        Expanded(
          flex: 2,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                onTap: () {
                  if (widget.quantity > 1) {
                    widget.onQuantityChanged(widget.quantity - 1);
                  } else {
                    widget.onRemove();
                  }
                },
                child: Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: context.primaryColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(Icons.remove, color: Colors.white, size: 18),
                ),
              ),
              spacerWidth(8),
              Flexible(
                child: TextFieldApp(
                  controller: _quantityController,
                  keyboardType: TextInputType.number,
                  radius: 8,
                  decoration: inputDecorationApp(context: context).copyWith(
                    contentPadding: EdgeInsets.only(bottom: 5),
                    filled: false,
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                  ),
                  inputFormaters: [FilteringTextInputFormatter.digitsOnly],
                  onchange: (value) {
                    final qty = int.tryParse(value) ?? 1;
                    if (qty > 0) {
                      widget.onQuantityChanged(qty);
                    }
                  },
                  containsPadding: EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 8,
                  ),
                ),
              ),
              spacerWidth(8),
              GestureDetector(
                onTap: () {
                  widget.onQuantityChanged(widget.quantity + 1);
                },
                child: Container(
                  width: 32,
                  height: 32,
                  decoration: BoxDecoration(
                    color: context.primaryColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(Icons.add, color: Colors.white, size: 18),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
