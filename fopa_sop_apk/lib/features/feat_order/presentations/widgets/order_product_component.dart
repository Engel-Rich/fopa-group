import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_with_config_model.dart';

class OrderProductComponent extends StatefulWidget {
  final ProductWithConfigModel product;
  final int quantity;
  final double unitPrice;
  final ValueChanged<int> onQuantityChanged;
  final ValueChanged<double> onUnitPriceChanged;
  final VoidCallback onRemove;

  const OrderProductComponent({
    super.key,
    required this.product,
    required this.quantity,
    required this.unitPrice,
    required this.onQuantityChanged,
    required this.onUnitPriceChanged,
    required this.onRemove,
  });

  @override
  State<OrderProductComponent> createState() => _OrderProductComponentState();
}

class _OrderProductComponentState extends State<OrderProductComponent> {
  late TextEditingController _quantityController;
  late TextEditingController _unitPriceController;

  @override
  void initState() {
    super.initState();
    _quantityController = TextEditingController(
      text: widget.quantity.toString(),
    );
    _unitPriceController = TextEditingController(
      text: widget.unitPrice.toStringAsFixed(0),
    );
  }

  @override
  void didUpdateWidget(OrderProductComponent oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.quantity != widget.quantity) {
      _quantityController.text = widget.quantity.toString();
    }
    if (oldWidget.unitPrice != widget.unitPrice) {
      _unitPriceController.text = widget.unitPrice.toStringAsFixed(0);
    }
  }

  @override
  void dispose() {
    _quantityController.dispose();
    _unitPriceController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 4,
          child: Row(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SimpleText(
                    text: widget.product.name,
                    size: 16,
                    weight: FontWeight.bold,
                    color: context.titleLargeColor,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    textAlign: TextAlign.start,
                  ),
                  spacerHeight(4),
                  SimpleText(
                    text: "FCFA",
                    // text:
                    //     "Prix de base: ${widget.product.defaultUnitPrice.toInt()} FCFA",
                    size: 15,
                    color: context.titleLargeColor,
                    weight: FontWeight.w500,
                  ),
                ],
              ),
              spacerWidth(5),
              Expanded(
                child: TextFieldApp(
                  filled: true,
                  fillColor: context.tertiary,
                  controller: _unitPriceController,
                  keyboardType: TextInputType.number,
                  hintText: "Prix unitaire",
                  style: appTextStyle.copyWith(fontSize: 17),
                  inputFormaters: [FilteringTextInputFormatter.digitsOnly],
                  decoration: inputDecorationApp(context: context).copyWith(
                    filled: true,
                    fillColor: context.tertiary.withAppOppacity(0.5),
                    contentPadding: EdgeInsets.only(
                      bottom: 0,
                      top: 0,
                      left: 0,
                      right: 0,
                    ),
                    border: InputBorder.none,
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                  ),
                  onchange: (value) {
                    final price = double.tryParse(value);
                    if (price != null && price > 0) {
                      widget.onUnitPriceChanged(price);
                    }
                  },
                  containsPadding: EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 8,
                  ),
                ),
              ),              
              spacerWidth(5),
            ],
          ),
        ),
        Expanded(
          flex: 3,
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
                    filled: true,
                    fillColor: context.tertiary.withAppOppacity(0.5),
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
