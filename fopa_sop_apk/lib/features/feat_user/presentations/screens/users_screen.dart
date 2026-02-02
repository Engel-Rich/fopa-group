import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/list_skeleton.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/controllers/user_provider.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/widgets/user_component.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class UsersScreen extends StatelessWidget {
  const UsersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: RefreshIndicator(
          onRefresh: () async {
            await context.read<UserProvider>().listUsers();
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Consumer<UserProvider>(
              builder: (context, userProvider, child) {
                // Charger les utilisateurs si la liste est vide
                if (userProvider.listUsersState.data == null ||
                    userProvider.listUsersState.data!.isEmpty) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    userProvider.listUsers();
                  });
                }

                final users = userProvider.listUsersState.data ?? [];

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    spacerHeight(30),
                    InkWell(
                      onTap: () {
                        context.pop();
                      },
                      child: Icon(Icons.arrow_back),
                    ),
                    spacerHeight(12),
                    SimpleText(
                      text: "Gestion des utilisateurs",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(24),
                    TextFieldApp(
                      prefixIcon: Icon(Icons.person),
                      suffixIcon: Icon(Icons.search),
                      hintText: "Rechercher un utilisateur",
                      radius: 8,
                      keyboardType: TextInputType.text,
                    ),
                    spacerHeight(8),
                    Divider(color: context.tertiary),
                    spacerHeight(15),
                    SimpleText(
                      text: "Liste des utilisateurs",
                      size: 24,
                      weight: FontWeight.bold,
                      color: context.titleLargeColor,
                    ),
                    spacerHeight(15),
                    if (userProvider.listUsersState.isLoading)
                      const ListSkeleton(itemCount: 5)
                    else if (users.isEmpty)
                      Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SimpleText(
                              text: "Aucun utilisateur disponible",
                              color: context.titleLargeColor,
                            ),
                            spacerHeight(20),
                            CustomAppPrimaryButton(
                              title: "Actualiser",
                              onPressed: () {
                                userProvider.listUsers();
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
                        itemCount: users.length,
                        itemBuilder: (context, index) {
                          return UserComponent(userResponseModel: users[index]);
                        },
                      ),
                  ],
                );
              },
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          context.pushNamed(AppRoutes.createUserRoute);
        },
        icon: Icon(Icons.person, color: Colors.white),
        label: SimpleText(
          text: "Add",
          color: Colors.white,
          weight: FontWeight.w600,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endFloat,
    );
  }
}
