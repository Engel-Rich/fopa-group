import 'package:flutter/widgets.dart';
import 'dart:math' as math show pi;

import 'package:fopa_sop_apk/cores/app_theme.dart';

class AppLoader extends StatefulWidget {
  final double size;
  final Color? color;
  const AppLoader({super.key, this.size = 50.0, this.color});

  @override
  State<AppLoader> createState() => _AppLoaderState();
}

class _AppLoaderState extends State<AppLoader>
    with SingleTickerProviderStateMixin {
  late AnimationController animationController;
  late Animation animation;

  @override
  void initState() {
    super.initState();
    init();
  }

  void init() {
    animationController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    animation =
        Tween<double>(begin: 0, end: 2 * math.pi).animate(animationController)
          ..addListener(() {
            setState(() {});
          });
    animationController.repeat();
  }

  @override
  void dispose() {
    animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Transform.rotate(
      angle: animation.value,
      child: Image.asset(
        "assets/LoadingIndicator.png",
        width: widget.size,
        color: widget.color ?? white,
        height: widget.size,
        fit: BoxFit.cover,
      ),
    );
  }
}
