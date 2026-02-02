import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_category/datas/models/category_response_model.dart';
import 'package:go_router/go_router.dart';

class CategoriesComponent extends StatelessWidget {
  final CategoryResponseModel categoryResponseModel;
  const CategoriesComponent({super.key, required this.categoryResponseModel});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: SimpleText(
        text: categoryResponseModel.name,
        weight: FontWeight.bold,
        color: context.titleLargeColor,
      ),
      subtitle: SimpleText(
        text:
            categoryResponseModel.description ??
            "${categoryResponseModel.id.substring(12).toUpperCase()}...",
        size: 14,
      ),
      trailing: PopupMenuButton(
        icon: Icon(Icons.more_vert_outlined, color: context.titleLargeColor),
        itemBuilder: (context) => [
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.createCategorieRoute,
                extra: categoryResponseModel,
              );
            },
            child: SimpleText(text: "Modifier"),
          ),
        ],
      ),
    );
  }
}
