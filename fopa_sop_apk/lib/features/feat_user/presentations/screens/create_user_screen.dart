import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_user/datas/models/user_response_model.dart';
import 'package:fopa_sop_apk/features/feat_user/presentations/controllers/user_provider.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CreateUserScreen extends StatefulWidget {
  final UserResponseModel? user;
  const CreateUserScreen({super.key, this.user});

  @override
  State<CreateUserScreen> createState() => _CreateUserScreenState();
}

class _CreateUserScreenState extends State<CreateUserScreen> {
  final formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final passwordController = TextEditingController();
  UserRole _selectedRole = UserRole.CAISSIERE;

  String _generateUsername() {
    final phone = phoneController.text.replaceAll(RegExp(r'\D'), '');
    final nameParts = nameController.text.trim().split(RegExp(r'\s+'));
    final firstWord = nameParts.isNotEmpty ? nameParts.first : '';
    final sanitized = firstWord.replaceAll(RegExp(r'[^a-zA-Z0-9]'), '');
    return '${phone}_$sanitized';
  }

  @override
  void initState() {
    super.initState();
    if (widget.user != null) {
      nameController.text = widget.user!.name;
      emailController.text = widget.user!.email ?? '';
      phoneController.text = widget.user!.phone ?? '';
      _selectedRole = widget.user!.role;
    }
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    passwordController.dispose();
    super.dispose();
  }

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
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: widget.user != null
              ? "Modifier l'utilisateur ${widget.user!.name}"
              : "Créer un utilisateur",
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Consumer<UserProvider>(
            builder: (context, userProvider, child) {
              return Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(text: "Nom de l'utilisateur"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "John Doe",
                      radius: 8,
                      keyboardType: TextInputType.text,
                      controller: nameController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le nom est requis";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Email de l'utilisateur (facultatif)"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "john_doe@example.com",
                      radius: 8,
                      keyboardType: TextInputType.emailAddress,
                      maxLines: 1,
                      controller: emailController,
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Numéro de téléphone"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "692637363",
                      radius: 8,
                      inputFormaters: [
                        FilteringTextInputFormatter.digitsOnly,
                        FilteringTextInputFormatter.singleLineFormatter,
                      ],
                      keyboardType: TextInputType.phone,
                      controller: phoneController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le numéro de téléphone est requis";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Rôle"),
                    spacerHeight(8),
                    DropdownButtonFormField<UserRole>(
                      items: [UserRole.ADMIN, UserRole.CAISSIERE]
                          .map(
                            (role) => DropdownMenuItem<UserRole>(
                              value: role,
                              child: SimpleText(text: _getRoleLabel(role)),
                            ),
                          )
                          .toList(),
                      decoration: inputDecorationApp(
                        context: context,
                        hintext: "Sélectionnez le rôle",
                        radius: 8,
                      ),
                      value: _selectedRole,
                      onChanged: (value) {
                        if (value != null) {
                          setState(() {
                            _selectedRole = value;
                          });
                        }
                      },
                      validator: (value) {
                        if (value == null) {
                          return "Le rôle est requis";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Mot de passe"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: widget.user != null
                          ? "Laisser vide pour ne pas modifier"
                          : "password123",
                      radius: 8,
                      maxLines: 1,
                      keyboardType: TextInputType.visiblePassword,
                      obscureText: true,
                      controller: passwordController,
                      validator: (value) {
                        if (widget.user == null) {
                          if (value == null || value.isEmpty) {
                            return "Le mot de passe est requis";
                          }
                          if (value.length < 6) {
                            return "Le mot de passe doit contenir au moins 6 caractères";
                          }
                        } else {
                          if (value != null &&
                              value.isNotEmpty &&
                              value.length < 6) {
                            return "Le mot de passe doit contenir au moins 6 caractères";
                          }
                        }
                        return null;
                      },
                    ),
                    spacerHeight(30),
                    CustomAppPrimaryButton(
                      title: widget.user != null
                          ? "Modifier l'utilisateur"
                          : "Créer l'utilisateur",
                      onPressed: () async {
                        if (formKey.currentState!.validate()) {
                          if (widget.user != null) {
                            await updateUser(userProvider, context);
                          } else {
                            await createUser(userProvider, context);
                          }
                        }
                      },
                      height: 55,
                      radius: 8,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      withDefaultLoader: true,
                      isLoading:
                          userProvider.createUserState.isLoading ||
                          userProvider.updateUserState.isLoading,
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

  Future<void> updateUser(
    UserProvider userProvider,
    BuildContext context,
  ) async {
    final dto = UpdateUserDto(
      email: emailController.text.isEmpty ? null : emailController.text,
      name: nameController.text,
      phone: phoneController.text,
      username: _generateUsername(),
      password: passwordController.text.isNotEmpty
          ? passwordController.text
          : null,
      role: _selectedRole,
    );
    await userProvider.updateUser(widget.user!.id, dto);
    if (userProvider.updateUserState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              userProvider.updateUserState.errorModel?.error ??
                  "Erreur lors de la mise à jour de l'utilisateur",
            ),
          ),
        );
      }
    } else if (userProvider.updateUserState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }

  Future<void> createUser(
    UserProvider userProvider,
    BuildContext context,
  ) async {
    final dto = CreateUserDto(
      email: emailController.text.isEmpty ? null : emailController.text,
      name: nameController.text,
      phone: phoneController.text,
      username: _generateUsername(),
      password: passwordController.text,
      role: _selectedRole,
    );
    await userProvider.createUser(dto);

    if (userProvider.createUserState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              userProvider.createUserState.errorModel?.error ??
                  "Erreur lors de la création de l'utilisateur",
            ),
          ),
        );
      }
    } else if (userProvider.createUserState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }
}
