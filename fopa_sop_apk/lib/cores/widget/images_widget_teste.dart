import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'dart:ui' as ui;

class ImagesWidgetTeste extends StatelessWidget {
  final ui.Image image;

  const ImagesWidgetTeste({super.key, required this.image});

  Future<Uint8List> _imageToBytes() async {
    final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
    return byteData!.buffer.asUint8List();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Uint8List>(
      future: _imageToBytes(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }

        if (snapshot.hasError) {
          return const Text('Erreur affichage image');
        }

        return Center(child: Image.memory(snapshot.data!));
      },
    );
  }
}
