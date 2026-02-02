import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:pos_connect_aidl/pos_connect_aidl.dart';

final GlobalKey repaintBoundaryKey = GlobalKey();

Future<void> printImage(String pathImage) async {
  final posConnectAidlPlugin = PosConnectAidl();

  final ByteData bytes = await rootBundle.load(pathImage);
  final Uint8List listBytes = bytes.buffer.asUint8List();

  await posConnectAidlPlugin.printImage(pathImage: listBytes);
}

/// Capture le widget enveloppe dans un RepaintBoundary (attache a [repaintBoundaryKey])
/// et envoie l'image au peripherique d'impression.

Future<void> printWidget(BuildContext context) async {
  final boundary =
      repaintBoundaryKey.currentContext?.findRenderObject()
          as RenderRepaintBoundary?;
  if (boundary == null) return;

  final image = await boundary.toImage(pixelRatio: 3.0);
  final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
  if (byteData == null) return;
  final listBytes = byteData.buffer.asUint8List();

  // context.pushNamed(AppRoutes.imagesWidgetTesteRoute, extra: image);
  final posConnectAidlPlugin = PosConnectAidl();
  await posConnectAidlPlugin.printImage(pathImage: listBytes);
}

Future<void> convertPdfToImage(String pathPdf) async {}
