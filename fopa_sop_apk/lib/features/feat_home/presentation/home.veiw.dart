import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_auth/feat_auth.dart';
import 'package:fopa_sop_apk/features/feat_category/presentations/controllers/category_provider.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/controllers/customer_provider.dart';
import 'package:fopa_sop_apk/features/feat_order/presentations/controllers/order_provider.dart';
import 'package:fopa_sop_apk/features/feat_product/presentations/controllers/product_provider.dart';

import 'package:fopa_sop_apk/features/feat_order/presentations/widgets/order_component.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class _IconCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback onTap;
  const _IconCard({required this.title, required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        GestureDetector(
          onTap: onTap,
          child: Container(
            width: SizeConfig.screenWidth * 0.190,
            height: SizeConfig.screenWidth * 0.190,
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: context.tertiary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: context.primaryColor, size: 32),
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          width: SizeConfig.screenWidth * 0.190,
          child: SimpleText(
            text: title,
            size: 12,
            textAlign: TextAlign.center,
            weight: FontWeight.w600,
            color: context.titleLargeColor,
          ),
        ),
      ],
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    List<HomeCardElements> homeCardElements = [
      HomeCardElements(
        title: "Gestion des clients",
        iconAsset: "assets/client2.png",
        onTap: () {
          context.pushNamed(AppRoutes.customersRoute);
        },
      ),
      HomeCardElements(
        title: "Gestion des produits",
        iconAsset: "assets/product1.png",
        onTap: () {
          context.pushNamed(AppRoutes.productsRoute);
        },
      ),
      HomeCardElements(
        title: "Gestion des catégories",
        iconAsset: "assets/cat_1.png",
        onTap: () {
          context.pushNamed(AppRoutes.categorieRoute);
        },
      ),
      HomeCardElements(
        title: "Comptabilité",
        iconAsset: "assets/statistics.png",
        onTap: () {
          context.pushNamed(AppRoutes.reportRoute);
        },
      ),
    ];
    return Builder(
      builder: (context) {
        // Appeler getSilences pour charger les données
        WidgetsBinding.instance.addPostFrameCallback((_) {
          final productProvider = Provider.of<ProductProvider>(
            context,
            listen: false,
          );
          final customerProvider = Provider.of<CustomerProvider>(
            context,
            listen: false,
          );
          final categoryProvider = Provider.of<CategoryProvider>(
            context,
            listen: false,
          );
          // order provider
          final orderProvider = Provider.of<OrderProvider>(
            context,
            listen: false,
          );

          productProvider.getSilences();
          customerProvider.getSilences();
          categoryProvider.getSilences();
          orderProvider.listOrders(page: 1, limit: 5);
        });

        final userProvider = context.watch<AuthProvider>();
        final user = userProvider.currentUser;
        final name = user?.name ?? "John Doe";

        return Scaffold(
          appBar: AppBar(
            title: SimpleText(
              text: "Bienvenus, $name",
              size: 20,
              weight: FontWeight.bold,
              color: context.titleLargeColor,
            ),
            actions: [
              IconButton(
                icon: Icon(Icons.logout, color: context.titleLargeColor),
                onPressed: () => context.read<AuthProvider>().logout(context),
              ),
            ],
          ),
          body: Padding(
            padding: EdgeInsets.all(16.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Wrap(
                      spacing: 10,
                      runSpacing: 20,
                      alignment: WrapAlignment.center,
                      runAlignment: WrapAlignment.center,
                      children: [
                        for (var i = 0; i < 4; i++)
                          HomeCardWidget(homeCardElements: homeCardElements[i]),
                        _IconCard(
                          title: "Emballages",
                          icon: Icons.inventory_2_outlined,
                          onTap: () => context.pushNamed(
                            AppRoutes.packageManagementRoute,
                          ),
                        ),
                      ],
                    ),
                  ),
                  spacerHeight(30),
                  CustomAppPrimaryButton(
                    title: "Facturer",
                    onPressed: () {
                      context.pushNamed(AppRoutes.createOrderRoute);
                    },
                    width: SizeConfig.screenWidth * 0.42,
                    color: Colors.transparent,
                    border: Border.all(color: context.primaryColor),
                    textColor: context.titleLargeColor,
                    height: 55,
                    radius: 8,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                  spacerHeight(30),
                  // Section Historique
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SimpleText(
                        text: "Historique",
                        size: 18,
                        weight: FontWeight.bold,
                        color: context.titleLargeColor,
                      ),
                      TextButton(
                        onPressed: () {
                          context.pushNamed(AppRoutes.orderHistoriqueRoute);
                        },
                        child: SimpleText(
                          text: "Voir+",
                          size: 14,
                          color: context.primaryColor,
                          weight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                  spacerHeight(12),
                  Consumer<OrderProvider>(
                    builder: (context, orderProvider, child) {
                      if (orderProvider.listOrdersState.isLoading &&
                          orderProvider.localOrders.isEmpty) {
                        return Center(
                          child: Padding(
                            padding: EdgeInsets.all(20),
                            child: CircularProgressIndicator(),
                          ),
                        );
                      }

                      if (orderProvider.listOrdersState.hasError) {
                        return Container(
                          padding: EdgeInsets.all(20),
                          child: Column(
                            children: [
                              SimpleText(
                                text:
                                    orderProvider
                                        .listOrdersState
                                        .errorModel
                                        ?.error ??
                                    "Une erreur est survenue",
                                size: 14,
                                color: context.titleLargeColor.withAppOppacity(
                                  0.7,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              spacerHeight(12),
                              CustomAppPrimaryButton(
                                title: "Actualiser",
                                onPressed: () {
                                  orderProvider.listOrders(page: 1, limit: 5);
                                },
                                width: SizeConfig.screenWidth * 0.5,
                                height: 45,
                                radius: 8,
                              ),
                            ],
                          ),
                        );
                      }
                      if (orderProvider.localOrders.isEmpty) {
                        return Container(
                          padding: EdgeInsets.all(20),
                          child: Column(
                            children: [
                              SimpleText(
                                text: "Aucune commande récente",
                                size: 14,
                                color: context.titleLargeColor.withAppOppacity(
                                  0.7,
                                ),
                                textAlign: TextAlign.center,
                              ),
                              spacerHeight(12),
                              CustomAppPrimaryButton(
                                title: "Actualiser",
                                onPressed: () {
                                  orderProvider.listOrders(page: 1, limit: 5);
                                },
                                width: SizeConfig.screenWidth * 0.5,
                                height: 45,
                                radius: 8,
                              ),
                            ],
                          ),
                        );
                      }

                      return Column(
                        children: orderProvider.localOrders
                            .map(
                              (order) => OrderComponent(
                                order: order,
                                onPaymentSuccess: () {
                                  orderProvider.listOrders(page: 1, limit: 5);
                                },
                              ),
                            )
                            .toList(),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}

class HomeCardWidget extends StatelessWidget {
  final HomeCardElements homeCardElements;
  const HomeCardWidget({super.key, required this.homeCardElements});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(
          width: SizeConfig.screenWidth * 0.190,
          height: SizeConfig.screenWidth * 0.190,
          padding: EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: context.tertiary,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Image.asset(homeCardElements.iconAsset),
        ).ontap(homeCardElements.onTap),
        spacerHeight(8),
        SizedBox(
          width: SizeConfig.screenWidth * 0.190,
          child: SimpleText(
            text: homeCardElements.title,
            size: 12,
            textAlign: TextAlign.center,
            weight: FontWeight.w600,
            color: context.titleLargeColor,
          ),
        ),
      ],
    );
  }
}

class HomeCardElements {
  final String title;
  final String iconAsset;
  final VoidCallback onTap;

  HomeCardElements({
    required this.title,
    required this.iconAsset,
    required this.onTap,
  });
}
