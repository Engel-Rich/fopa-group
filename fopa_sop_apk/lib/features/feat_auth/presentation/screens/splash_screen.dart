import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:fopa_sop_apk/features/feat_auth/presentation/controllers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      authProvider.openApp(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Image.asset(
          'assets/logo_c.png',
          fit: BoxFit.cover,
          height: 160,
          width: 160,
        ),
      ),
    );
  }
}
