import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/app_buttons.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/create_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/dtos/update_customer_dto.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/domaines/controllers/customer_provider.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/create_user_dto.dart';
import 'package:fopa_sop_apk/features/feat_auth/datas/models/user_model.dart';
import 'package:fopa_sop_apk/features/feat_user/domaines/dtos/update_user_dto.dart';

import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class CreateCustomerScreen extends StatefulWidget {
  final CustomerResponseModel? customer;
  const CreateCustomerScreen({super.key, this.customer});

  @override
  State<CreateCustomerScreen> createState() => _CreateCustomerScreenState();
}

class _CreateCustomerScreenState extends State<CreateCustomerScreen> {
  final formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final phoneController = TextEditingController();
  final addressController = TextEditingController();
  final passwordController = TextEditingController();

  /// Genere le username: numero_telephone_premierMotDuNom (sans caracteres speciaux)
  String _generateUsername() {
    final phone = phoneController.text.replaceAll(RegExp(r'\D'), '');
    final nameParts = nameController.text.trim().split(RegExp(r'\s+'));
    final firstWord = nameParts.isNotEmpty ? nameParts.first : '';
    final sanitized = firstWord.replaceAll(RegExp(r'[^a-zA-Z0-9]'), '');
    return '${phone}_$sanitized';
  }

  @override
  void initState() {
    if (widget.customer != null) {
      nameController.text = widget.customer!.user?.name ?? '';
      emailController.text = widget.customer!.user?.email ?? '';
      phoneController.text = widget.customer!.user?.phone ?? '';
      addressController.text = widget.customer!.address ?? '';
      passwordController.text = widget.customer!.user?.name ?? '';
    }
    super.initState();
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    phoneController.dispose();
    addressController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: SimpleText(
          text: widget.customer != null
              ? "Modifier le client ${widget.customer!.user?.name}"
              : "Créer un client",
        ),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Consumer<CustomerProvider>(
            builder: (context, customerProvider, child) {
              return Form(
                key: formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SimpleText(text: "Nom du client"),
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
                    SimpleText(text: "Email du client (facultatif)"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "john_doe@example.com",
                      radius: 8,
                      keyboardType: TextInputType.emailAddress,
                      maxLines: 1,
                      controller: emailController,
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Numero de telephone"),
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
                    SimpleText(text: "Adresse du client"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "Douala, Yaoundé",
                      radius: 8,
                      keyboardType: TextInputType.text,
                      controller: addressController,
                    ),
                    spacerHeight(20),
                    SimpleText(text: "Mot de passe du client"),
                    spacerHeight(8),
                    TextFieldApp(
                      hintText: "password123",
                      radius: 8,
                      maxLines: 1,
                      keyboardType: TextInputType.visiblePassword,
                      obscureText: true,
                      controller: passwordController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return "Le mot de passe est requis";
                        }
                        if (value.length < 6) {
                          return "Le mot de passe doit contenir au moins 6 caractères";
                        }
                        return null;
                      },
                    ),
                    spacerHeight(30),
                    CustomAppPrimaryButton(
                      title: "Créer le client",
                      onPressed: () async {
                        if (formKey.currentState!.validate()) {
                          if (widget.customer != null) {
                            await updateUser(customerProvider, context);
                          } else {
                            await createUser(customerProvider, context);
                          }
                        }
                      },
                      height: 55,
                      radius: 8,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      withDefaultLoader: true,
                      isLoading:
                          customerProvider.createCustomerState.isLoading ||
                          customerProvider.updateCustomerState.isLoading,
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
    CustomerProvider customerProvider,
    BuildContext context,
  ) async {
    final dto = UpdateCustomerDto(
      user: UpdateUserDto(
        email: emailController.text.isEmpty ? null : emailController.text,
        name: nameController.text,
        phone: phoneController.text,
        username: _generateUsername(),
        password: passwordController.text,
        role: UserRole.CLIENT,
      ),
    );
    await customerProvider.updateCustomer(widget.customer!.id, dto);
    if (customerProvider.updateCustomerState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              customerProvider.updateCustomerState.errorModel?.error ??
                  "Erreur lors de la mise à jour du client",
            ),
          ),
        );
      }
    } else if (customerProvider.updateCustomerState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }

  Future<void> createUser(
    CustomerProvider customerProvider,
    BuildContext context,
  ) async {
    final dto = CreateCustomerDto(
      user: CreateUserDto(
        email: emailController.text.isEmpty ? null : emailController.text,
        name: nameController.text,
        phone: phoneController.text,
        username: _generateUsername(),
        password: passwordController.text,
        role: UserRole.CLIENT,
      ),
      address: addressController.text.isNotEmpty
          ? addressController.text
          : null,
    );
    await customerProvider.createCustomer(dto);

    if (customerProvider.createCustomerState.hasError) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              customerProvider.createCustomerState.errorModel?.error ??
                  "Erreur lors de la création du client",
            ),
          ),
        );
      }
    } else if (customerProvider.createCustomerState.hasNotNullData) {
      if (context.mounted) {
        context.pop();
      }
    }
  }
}
