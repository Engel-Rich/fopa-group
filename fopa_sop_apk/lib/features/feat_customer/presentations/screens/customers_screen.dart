import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/controllers/customer_provider.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/widgets/customer_component.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CustomersScreen extends StatelessWidget {
  const CustomersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Padding(
        padding: EdgeInsets.symmetric(horizontal: 16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            context.read<CustomerProvider>().getSilences();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Consumer<CustomerProvider>(
              builder: (context, customerProvider, child) {
                // Charger les clients si la liste est vide
                if (customerProvider.localCustomers.isEmpty) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    customerProvider.getSilences();
                  });
                }
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(
                      text: "Gestion des clients",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(24),
                    TextFieldApp(
                      prefixIcon: Icon(Icons.person),
                      suffixIcon: Icon(Icons.search),
                      hintText: "Rechercher un client",
                      radius: 8,
                      keyboardType: TextInputType.text,
                    ),
                    spacerHeight(8),
                    Divider(color: context.tertiary),
                    spacerHeight(15),
                    SimpleText(
                      text: "Liste des clients",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(15),
                    if (customerProvider.listCustomersState.isLoading)
                      const ListSkeleton(itemCount: 5)
                    else if (customerProvider.localCustomers.isEmpty)
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SimpleText(
                              text: "Aucun client disponible",
                              color: context.titleLargeColor,
                            ),
                            spacerHeight(20),
                            CustomAppPrimaryButton(
                              title: "Actualiser",
                              onPressed: () {
                                customerProvider.getSilences();
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
                        itemCount: customerProvider.localCustomers.length,
                        itemBuilder: (context, index) {
                          return CustomerComponent(
                            customerResponseModel:
                                customerProvider.localCustomers[index],
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
        title: "Nouveau client",
        onPressed: () {
          context.pushNamed(AppRoutes.createCustomerRoute);
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
