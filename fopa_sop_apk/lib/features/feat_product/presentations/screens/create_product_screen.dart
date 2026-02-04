import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/update_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/dtos/create_product_dto.dart';
import 'package:fopa_sop_apk/features/feat_product/datas/models/product_response_model.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CreateProductScreen extends StatefulWidget {
  final ProductResponseModel? product;
  const CreateProductScreen({super.key, this.product});

  @override
  State<CreateProductScreen> createState() => _CreateProductScreenState();
}

class _CreateProductScreenState extends State<CreateProductScreen> {
  final formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final priceController = TextEditingController();
  final quantityController = TextEditingController();
  final descriptionController = TextEditingController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final productProvider = Provider.of<ProductProvider>(
        context,
        listen: false,
      );
      // productProvider.changeSelectedCategory(null);
      final categoryProvider = Provider.of<CategoryProvider>(
        context,
        listen: false,
      );
      if (categoryProvider.localCategories.isEmpty) {
        categoryProvider.getSilences();
      }
      if (widget.product != null) {
        nameController.text = widget.product!.name;
        priceController.text = widget.product!.price.toString();
        descriptionController.text = widget.product!.description ?? '';
        productProvider.changeSelectedCategory(widget.product!.category);
      }
    });
  }

  @override
  void dispose() {
    context.read<ProductProvider>().changeSelectedCategory(null);
    nameController.dispose();
    priceController.dispose();
    quantityController.dispose();
    descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: widget.product != null
              ? "Modifier le produit ${widget.product!.name}"
              : "Créer un produit",
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Consumer2<ProductProvider, CategoryProvider>(
            builder: (context, productProvider, categoryProvider, child) {
              return Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(text: "Catégorie du produit"),
                    spacerHeight(8),
                    DropdownButtonFormField<CategoryResponseModel>(
                      items: categoryProvider.localCategories
                          .map(
                            (category) =>
                                DropdownMenuItem<CategoryResponseModel>(
                                  value: category,
                                  child: SimpleText(text: category.name),
                                ),
                          )
                          .toList(),
                      decoration: inputDecorationApp(
                        context: context,
                        hintext: "Sélectionnez la catégorie du produit",
                        radius: 8,
                      ),
                      initialValue: productProvider.selectedCategory,
                      onChanged: (value) {
                        productProvider.changeSelectedCategory(value);
                      },
                      validator: (value) {
                        if (value == null) {
                          return "La catégorie est requise";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Nom du produit"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "Eau minérale 1.5L",
                      radius: 8,
                      keyboardType: TextInputType.text,
                      controller: nameController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le nom du produit est requis";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Prix du produit"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "500",
                      radius: 8,
                      keyboardType: TextInputType.number,
                      controller: priceController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le prix est requis";
                        }
                        final price = double.tryParse(value);
                        if (price == null || price <= 0) {
                          return "Le prix doit être un nombre positif";
                        }
                        return null;
                      },
                    ),
                    if (widget.product == null) ...[
                      spacerHeight(20),
                      SimpleText(text: "Quantité du produit"),
                      spacerHeight(8),
                      TextFieldApp(
                        hintText: "100",
                        radius: 8,
                        keyboardType: TextInputType.number,
                        controller: quantityController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return "La quantité est requise";
                          }
                          final quantity = double.tryParse(value);
                          if (quantity == null || quantity < 0) {
                            return "La quantité doit être un nombre positif ou zéro";
                          }
                          return null;
                        },
                      ),
                    ],
                    spacerHeight(20),
                    SimpleText(text: "Description du produit"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "Eau minérale naturelle",
                      radius: 8,
                      keyboardType: TextInputType.multiline,
                      maxLines: 3,
                      controller: descriptionController,
                    ),
                    spacerHeight(30),
                    CustomAppPrimaryButton(
                      title: "Créer le produit",
                      onPressed: () async {
                        if (formKey.currentState!.validate()) {
                          if (productProvider.selectedCategory == null) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text(
                                  "Veuillez sélectionner une catégorie",
                                ),
                              ),
                            );
                            return;
                          }
                          if (widget.product != null) {
                            await updateProduct(productProvider, context);
                          } else {
                            await createProduct(productProvider, context);
                          }
                        }
                      },
                      height: 55,
                      radius: 8,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      withDefaultLoader: true,
                      isLoading:
                          productProvider.createProductState.isLoading ||
                          productProvider.updateProductState.isLoading,
                    ),
                    spacerHeight(40),
                  ],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Future<void> createProduct(
    ProductProvider productProvider,
    BuildContext context,
  ) async {
    final dto = CreateProductDto(
      name: nameController.text,
      categoryId: productProvider.selectedCategory!.id,
      price: double.parse(priceController.text),
      quantity: double.parse(quantityController.text),
      description: descriptionController.text.isNotEmpty
          ? descriptionController.text
          : null,
    );
    await productProvider.createProduct(dto);

    if (productProvider.createProductState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              productProvider.createProductState.errorModel?.error ??
                  "Erreur lors de la création du produit",
            ),
          ),
        );
      }
    } else if (productProvider.createProductState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }

  Future<void> updateProduct(
    ProductProvider productProvider,
    BuildContext context,
  ) async {
    final dto = UpdateProductDto(
      name: nameController.text,
      categoryId: productProvider.selectedCategory!.id,
      price: double.parse(priceController.text),
      description: descriptionController.text.isNotEmpty
          ? descriptionController.text
          : null,
      isActive: true,
    );
    await productProvider.updateProduct(widget.product!.id, dto);
    if (productProvider.updateProductState.hasError && context.mounted) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              productProvider.updateProductState.errorModel?.error ??
                  "Erreur lors de la mise à jour du produit",
            ),
          ),
        );
      }
    } else if (productProvider.updateProductState.hasNotNullData &&
        context.mounted) {
      if (context.mounted) {
        context.pop();
      }
    }
  }
}
