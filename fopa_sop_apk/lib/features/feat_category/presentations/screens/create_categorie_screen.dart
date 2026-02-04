import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/dtos/create_category_dto.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CreateCategorieScreen extends StatefulWidget {
  final CategoryResponseModel? category;
  const CreateCategorieScreen({super.key, this.category});

  @override
  State<CreateCategorieScreen> createState() => _CreateCategorieScreenState();
}

class _CreateCategorieScreenState extends State<CreateCategorieScreen> {
  final formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final descriptionController = TextEditingController();

  @override
  void initState() {
    super.initState();
    if (widget.category != null) {
      nameController.text = widget.category!.name;
      descriptionController.text = widget.category!.description ?? '';
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: widget.category != null
              ? "Modifier la catégorie ${widget.category!.name}"
              : "Créer une catégorie",
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Consumer<CategoryProvider>(
            builder: (context, categoryProvider, child) {
              return Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(text: "Nom de la catégorie"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "Eaux",
                      radius: 8,
                      keyboardType: TextInputType.text,
                      controller: nameController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le nom de la catégorie est requis";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Description de la catégorie"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "Eaux minérales et gazeuses",
                      radius: 8,
                      keyboardType: TextInputType.multiline,
                      maxLines: 2,
                      controller: descriptionController,
                    ),
                    spacerHeight(60),
                    CustomAppPrimaryButton(
                      title: "Créer la catégorie",
                      onPressed: () async {
                        if (formKey.currentState!.validate()) {
                          if (widget.category != null) {
                            await updateCategorie(categoryProvider, context);
                          } else {
                            await createCategorie(categoryProvider, context);
                          }
                        }
                      },
                      height: 55,
                      radius: 8,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      withDefaultLoader: true,
                      isLoading:
                          categoryProvider.createCategoryState.isLoading ||
                          categoryProvider.updateCategoryState.isLoading,
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

  Future<void> createCategorie(
    CategoryProvider categoryProvider,
    BuildContext context,
  ) async {
    final dto = CreateCategoryDto(
      name: nameController.text,
      description: descriptionController.text.isNotEmpty
          ? descriptionController.text
          : null,
    );
    await categoryProvider.createCategory(dto);

    if (categoryProvider.createCategoryState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              categoryProvider.createCategoryState.errorModel?.error ??
                  "Erreur lors de la création de la catégorie",
            ),
          ),
        );
      }
    } else if (categoryProvider.createCategoryState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }

  Future<void> updateCategorie(
    CategoryProvider categoryProvider,
    BuildContext context,
  ) async {
    final dto = UpdateCategoryDto(
      name: nameController.text,
      description: descriptionController.text.isNotEmpty
          ? descriptionController.text
          : null,
    );
    await categoryProvider.updateCategory(widget.category!.id, dto);
    if (categoryProvider.updateCategoryState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              categoryProvider.updateCategoryState.errorModel?.error ??
                  "Erreur lors de la mise à jour de la catégorie",
            ),
          ),
        );
      }
    } else if (categoryProvider.updateCategoryState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }
}
