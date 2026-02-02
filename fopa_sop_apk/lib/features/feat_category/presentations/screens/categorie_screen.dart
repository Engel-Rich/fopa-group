import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';

import 'package:fopa_sop_apk/features/feat_category/presentations/widgets/categories_component.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CategorieScreen extends StatelessWidget {
  const CategorieScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            await context.read<CategoryProvider>().listCategories();
          },

          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Consumer<CategoryProvider>(
              builder: (context, categoryProvider, child) {
                // Charger les catégories si la liste est vide
                if (categoryProvider.localCategories.isEmpty) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    categoryProvider.getSilences();
                  });
                }

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(
                      text: "Gestion des catégories",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(24),
                    TextFieldApp(
                      prefixIcon: Icon(Icons.category),
                      suffixIcon: Icon(Icons.search),
                      hintText: "Rechercher une catégorie",
                      radius: 8,
                      keyboardType: TextInputType.text,
                    ),
                    spacerHeight(8),
                    Divider(color: context.tertiary),
                    spacerHeight(15),
                    SimpleText(
                      text: "Liste des catégories",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(15),
                    if (categoryProvider.listCategoriesState.isLoading)
                      const ListSkeleton(itemCount: 5)
                    else if (categoryProvider.localCategories.isEmpty)
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SimpleText(
                              text: "Aucune catégorie disponible",
                              color: context.titleLargeColor,
                            ),
                            spacerHeight(20),
                            CustomAppPrimaryButton(
                              title: "Actualiser",
                              onPressed: () {
                                categoryProvider.getSilences();
                              },
                              height: 45,
                              radius: 8,
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ],
                        ),
                      )
                    else
                      ListView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        padding: EdgeInsets.zero,
                        itemCount: categoryProvider.localCategories.length,
                        itemBuilder: (context, index) {
                          return CategoriesComponent(
                            categoryResponseModel:
                                categoryProvider.localCategories[index],
                          );
                        },
                      ),
                  ],
                );
              },
            ),
          ),
        ),
      ),
      floatingActionButton: CustomAppPrimaryButton(
        title: "Nouvelle catégorie",
        onPressed: () {
          context.pushNamed(AppRoutes.createCategorieRoute);
        },
        height: 50,
        radius: 8,
        width: 200,
        fontSize: 16,
        fontWeight: FontWeight.w600,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
      floatingActionButtonAnimator: FloatingActionButtonAnimator.scaling,
    );
  }
}
