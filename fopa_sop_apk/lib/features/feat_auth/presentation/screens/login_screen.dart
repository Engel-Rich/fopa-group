import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/routes.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/utils.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_auth/presentation/controllers/auth_provider.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Consumer<AuthProvider>(
          builder: (context, authProvider, child) {
            return Form(
              key: formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 30),
                  SimpleText(
                    text: "Bienvenus, \nContent de vous revoir",
                    size: 24,
                    weight: FontWeight.bold,
                    color: context.titleLargeColor,
                  ),
                  spacerHeight(60),
                  TextFieldApp(
                    prefixIcon: Icon(Icons.email),
                    hintText: "Entrez nom d'utilisateur ou email",
                    radius: 8,
                    keyboardType: TextInputType.emailAddress,
                    controller: authProvider.emailController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Le nom d'utilisateur ou email est requis";
                      }
                      return null;
                    },
                  ),
                  spacerHeight(20),
                  TextFieldApp(
                    prefixIcon: Icon(Icons.security),
                    hintText: "Entrez le mot de passe",
                    radius: 8,
                    keyboardType: TextInputType.visiblePassword,
                    controller: authProvider.passwordController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Le mot de passe est requis";
                      }
                      return null;
                    },
                  ),
                  spacerHeight(20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Icon(Icons.info_outline, color: context.secondaryColor),
                      spacerWidth(10),
                      SimpleText(
                        text: "Mot de passe oublié ?",
                        size: 15,
                        letterSpacing: 0.4,
                        weight: FontWeight.w600,
                        color: context.secondaryColor,
                      ),
                    ],
                  ),
                  spacerHeight(60),

                  CustomAppPrimaryButton(
                    title: "Se connecter",
                    onPressed: () async {
                      if (formKey.currentState!.validate()) {
                        await handleLongin(authProvider, context);
                      }
                    },
                    height: 55,
                    radius: 8,
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    withDefaultLoader: true,
                    isLoading: authProvider.loginState.isLoading,
                  ),

                  Spacer(),
                  // conditions d'utilisation et politique de confidentialité
                  Text.rich(
                    textAlign: TextAlign.center,
                    TextSpan(
                      text: "En vous connectant, vous acceptez nos ",
                      children: [
                        TextSpan(
                          text: "Conditions d'utilisation",
                          style: TextStyle(
                            color: context.secondaryColor,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        TextSpan(
                          text: " et ",
                          style: TextStyle(
                            color: context.titleLargeColor,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        TextSpan(
                          text: "Politique de confidentialité",
                          style: TextStyle(
                            color: context.secondaryColor,
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    style: TextStyle(
                      color: context.titleLargeColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  spacerHeight(40),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Future<void> handleLongin(
    AuthProvider authProvider,
    BuildContext context,
  ) async {
    await authProvider.login(context);
    if (context.mounted) {
      if (authProvider.loginState.hasError) {
        Utils.showInfoSnackBar(
          context,
          authProvider.loginState.errorModel?.error ??
              "Erreur lors de la connexion",
        );
      } else if (authProvider.loginState.hasNotNullData) {
        final authResponse = authProvider.loginState.data!;
        await authProvider.storeUserToken(authResponse.toUserToken());
        await authProvider.storeUser(authResponse.user);
        if (context.mounted) {
          context.pushReplacementNamed(AppRoutes.homeRoute);
        }
      }
    }
  }
}
