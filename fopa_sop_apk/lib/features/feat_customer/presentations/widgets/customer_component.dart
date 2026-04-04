import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:go_router/go_router.dart';

class CustomerComponent extends StatelessWidget {
  final CustomerResponseModel customerResponseModel;
  const CustomerComponent({super.key, required this.customerResponseModel});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: SimpleText(
        text: customerResponseModel.user?.name ?? '',
        weight: FontWeight.bold,
        color: context.titleLargeColor,
        size: 20,
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          SimpleText(
            text:
                "${customerResponseModel.user?.phone} - ${customerResponseModel.address ?? customerResponseModel.user?.email}",
            size: 18,
            weight: FontWeight.w600,
          ),
          SimpleText(
            text: "Dette: ${customerResponseModel.currentDebt.toInt()} FCFA",
          ),
          SimpleText(
            text:
                "Emballages: ${customerResponseModel.currentPackagesDebt.toInt()}",
            size: 17,
            weight: FontWeight.w500,
          ),
        ],
      ),
      trailing: PopupMenuButton(
        icon: Icon(Icons.more_vert_outlined, color: context.titleLargeColor),
        itemBuilder: (context) => <PopupMenuEntry<void>>[
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.createCustomerRoute,
                extra: customerResponseModel,
              );
            },
            child: SimpleText(text: "Modifier"),
          ),
          PopupMenuDivider(color: context.tertiary, thickness: 3),
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.orderHistoriqueRoute,
                extra: customerResponseModel,
              );
            },
            child: SimpleText(text: "Historiques de commandes"),
          ),
          PopupMenuDivider(color: context.tertiary, thickness: 3),
          PopupMenuItem(
            onTap: () {},
            child: SimpleText(text: "Créer une commande"),
          ),
        ],
      ),
    );
  }
}
