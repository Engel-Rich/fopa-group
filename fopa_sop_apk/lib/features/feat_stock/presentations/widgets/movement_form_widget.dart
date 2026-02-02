import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:fopa_sop_apk/features/feat_stock/datas/models/stock_movement_type.dart';

class MovementFormWidget extends StatefulWidget {
  final ProductResponseModel product;
  final Function({
    required StockMovementType type,
    required int quantity,
    double? unitPrice,
    String? reason,
  })
  onSubmitted;
  final bool isLoading;
  const MovementFormWidget({
    super.key,
    required this.onSubmitted,
    this.isLoading = false,
    required this.product,
  });

  @override
  State<MovementFormWidget> createState() => _MovementFormWidgetState();
}

class _MovementFormWidgetState extends State<MovementFormWidget> {
  final _quantityController = TextEditingController();
  final _unitPriceController = TextEditingController();
  final _reasonController = TextEditingController();
  StockMovementType _selectedType = StockMovementType.ENTREE;

  @override
  void dispose() {
    _quantityController.dispose();
    _unitPriceController.dispose();
    _reasonController.dispose();
    super.dispose();
  }

  void _handleSubmit() {
    final quantity = int.tryParse(_quantityController.text);
    if (quantity == null || quantity <= 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Veuillez entrer une quantité valide")),
      );
      return;
    }

    if (_selectedType == StockMovementType.ENTREE) {
      final unitPrice = double.tryParse(_unitPriceController.text);
      if (unitPrice == null || unitPrice <= 0) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Veuillez entrer un prix unitaire valide")),
        );
        return;
      }
      // _clearForm();
      widget.onSubmitted(
        type: _selectedType,
        quantity: quantity,
        unitPrice: unitPrice,
      );
    } else {
      if (_reasonController.text.isEmpty) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text("Veuillez entrer une raison")));
        return;
      }
      widget.onSubmitted(
        type: _selectedType,
        quantity: quantity,
        reason: _reasonController.text,
      );
    }
  }

  final _formKey = GlobalKey<FormState>();

  // void _clearForm() {
  //   _quantityController.clear();
  //   _reasonController.clear();
  // }

  @override
  void initState() {
    super.initState();
    _unitPriceController.text = widget.product.price.toString();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SimpleText(
            text: "Nouveau mouvement",
            size: 20,
            weight: FontWeight.bold,
            color: context.titleLargeColor,
          ),
          spacerHeight(15),
          SimpleText(
            text: "Type de mouvement",
            size: 14,
            color: context.titleLargeColor,
          ),
          spacerHeight(8),
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: context.tertiary),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              children: [
                Expanded(
                  child: RadioListTile<StockMovementType>(
                    title: SimpleText(text: "Entrée", size: 14),
                    value: StockMovementType.ENTREE,
                    groupValue: _selectedType,
                    onChanged: (value) {
                      setState(() {
                        _selectedType = value!;
                      });
                    },
                  ),
                ),
                Expanded(
                  child: RadioListTile<StockMovementType>(
                    title: SimpleText(text: "Sortie", size: 14),
                    value: StockMovementType.SORTIE,
                    groupValue: _selectedType,
                    onChanged: (value) {
                      setState(() {
                        _selectedType = value!;
                      });
                    },
                  ),
                ),
              ],
            ),
          ),
          spacerHeight(20),
          SimpleText(
            text: "Quantité",
            size: 14,
            color: context.titleLargeColor,
          ),
          spacerHeight(8),
          TextFieldApp(
            hintText: "0",
            radius: 8,
            keyboardType: TextInputType.number,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return "Veuillez entrer une quantité";
              }
              final quantity = int.tryParse(value);
              if (quantity == null || quantity <= 0) {
                return "Veuillez entrer une quantité valide";
              }
              return null;
            },
            controller: _quantityController,
            inputFormaters: [
              FilteringTextInputFormatter.digitsOnly,
              FilteringTextInputFormatter.singleLineFormatter,
            ],
          ),
          if (_selectedType == StockMovementType.ENTREE) ...[
            spacerHeight(20),
            SimpleText(
              text: "Prix unitaire",
              size: 14,
              color: context.titleLargeColor,
            ),
            spacerHeight(8),
            TextFieldApp(
              hintText: "0",
              radius: 8,
              keyboardType: TextInputType.number,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return "Veuillez entrer un prix unitaire";
                }
                final unitPrice = double.tryParse(value);
                if (unitPrice == null || unitPrice <= 0) {
                  return "Veuillez entrer un prix unitaire valide";
                }
                return null;
              },
              controller: _unitPriceController,
              inputFormaters: [
                FilteringTextInputFormatter.digitsOnly,
                FilteringTextInputFormatter.singleLineFormatter,
              ],
            ),
          ],
          if (_selectedType == StockMovementType.SORTIE) ...[
            spacerHeight(20),
            SimpleText(
              text: "Raison",
              size: 14,
              color: context.titleLargeColor,
            ),
            spacerHeight(8),
            TextFieldApp(
              hintText: "Raison de la sortie",
              radius: 8,
              keyboardType: TextInputType.text,
              controller: _reasonController,
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return "Veuillez entrer une raison";
                }
                return null;
              },
              maxLines: 2,
            ),
          ],
          spacerHeight(24),
          CustomAppPrimaryButton(
            title: _selectedType == StockMovementType.ENTREE
                ? "Enregistrer l'entrée"
                : "Enregistrer la sortie",
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                if (widget.isLoading) return;
                _handleSubmit();
              }
            },
            disabled: widget.isLoading,
            withDefaultLoader: true,
            isLoading: widget.isLoading,
            height: 55,
            radius: 8,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ],
      ),
    );
  }
}
