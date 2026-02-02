import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:go_router/go_router.dart';

class UserComponent extends StatelessWidget {
  final UserResponseModel userResponseModel;
  const UserComponent({super.key, required this.userResponseModel});

  String _getRoleLabel(UserRole role) {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrateur';
      case UserRole.CAISSIERE:
        return 'Caissière';
      case UserRole.CLIENT:
        return 'Client';
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: SimpleText(
        text: userResponseModel.name,
        weight: FontWeight.bold,
        color: context.titleLargeColor,
      ),
      subtitle: SimpleText(
        text:
            "${userResponseModel.phone ?? ''} - ${userResponseModel.email ?? ''} - ${_getRoleLabel(userResponseModel.role)}",
        size: 13,
      ),
      trailing: PopupMenuButton(
        icon: Icon(Icons.more_vert_outlined, color: context.titleLargeColor),
        itemBuilder: (context) => <PopupMenuEntry<void>>[
          PopupMenuItem(
            onTap: () {
              context.pushNamed(
                AppRoutes.createUserRoute,
                extra: userResponseModel,
              );
            },
            child: SimpleText(text: "Modifier"),
          ),
        ],
      ),
    );
  }
}
