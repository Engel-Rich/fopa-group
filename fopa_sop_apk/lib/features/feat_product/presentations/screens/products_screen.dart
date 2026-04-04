import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/widgets/product_component.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class ProductsScreen extends StatelessWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            await context.read<ProductProvider>().listProducts();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Consumer<ProductProvider>(
              builder: (context, productProvider, child) {
                // Charger les produits si la liste est vide
                // if (productProvider.localProducts.isEmpty) {
                //   WidgetsBinding.instance.addPostFrameCallback((_) {
                //     productProvider.getSilences();
                //   });
                // }

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(
                      text: "Gestion des produits",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(24),
                    TextFieldApp(
                      prefixIcon: Icon(Icons.article_outlined),
                      suffixIcon: Icon(Icons.search),
                      hintText: "Rechercher un produit",
                      radius: 8,
                      keyboardType: TextInputType.text,
                    ),
                    spacerHeight(8),
                    Divider(color: context.tertiary),
                    spacerHeight(15),
                    SimpleText(
                      text: "Liste des produits",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(15),
                    if (productProvider.listProductsState.isLoading)
                      const ListSkeleton(itemCount: 5)
                    else if (productProvider.localProducts.isEmpty)
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SimpleText(
                              text: "Aucun produit disponible",
                              color: context.titleLargeColor,
                            ),
                            spacerHeight(20),
                            CustomAppPrimaryButton(
                              title: "Actualiser",
                              onPressed: () {
                                productProvider.listProducts();
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
                        itemCount: productProvider.localProducts.length,
                        itemBuilder: (context, index) {
                          return ProductComponent(
                            productResponseModel:
                                productProvider.localProducts[index],
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
        title: "Nouveau produit",
        onPressed: () {
          context.pushNamed(AppRoutes.createProductRoute);
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
