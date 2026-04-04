import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:intl/intl.dart';
import 'package:printing/printing.dart';
import 'package:fopa_sop_apk/features/feat_order/datas/models/order_response_model.dart';
// import 'package:fopa_sop_apk/features/feat_order/presentations/screens/create_order_screen.dart';

class OrderPdfService {
  static pw.Document _generatePdf({required OrderResponseModel order}) {
    final pdf = pw.Document();

    final orderDate = order.createdAt;
    final dateFormat = DateFormat('dd-MM-yyyy');
    final timeFormat = DateFormat('HH:mm');

    final customer = order.customer;
    final items = order.items ?? [];
    final subTotal = order.subtotal;
    final balance = order.totalAmount;
    final amountPaid = order.amountPaid;

    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.roll80,
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.center,
            children: [
              // Header
              pw.Text(
                "FOPA SARL",
                style: pw.TextStyle(
                  fontSize: 20,
                  fontWeight: pw.FontWeight.bold,
                ),
                textAlign: pw.TextAlign.center,
              ),
              pw.SizedBox(height: 12),
              pw.Text(
                "Client: ${customer?.user?.name ?? ''}",
                style: pw.TextStyle(fontSize: 12),
                textAlign: pw.TextAlign.center,
              ),
              pw.Text(
                "Tel: ${customer?.user?.phone ?? ''}",
                style: pw.TextStyle(fontSize: 12),
                textAlign: pw.TextAlign.center,
              ),
              pw.SizedBox(height: 8),
              pw.Divider(),
              pw.SizedBox(height: 20),
              // Date and Time
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text(
                    "Date: ${dateFormat.format(orderDate)}",
                    style: pw.TextStyle(fontSize: 12),
                  ),
                  pw.Text(
                    timeFormat.format(orderDate),
                    style: pw.TextStyle(fontSize: 12),
                  ),
                ],
              ),
              pw.SizedBox(height: 8),
              pw.Divider(),
              pw.SizedBox(height: 12),
              // Products List
              ...items.map((item) {
                return pw.Padding(
                  padding: const pw.EdgeInsets.symmetric(vertical: 4),
                  child: pw.Row(
                    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      pw.Expanded(
                        child: pw.Text(
                          item.name,
                          style: pw.TextStyle(fontSize: 15),
                        ),
                      ),
                      pw.Text(
                        "${item.subtotal.toInt()} FCFA",
                        style: pw.TextStyle(fontSize: 15),
                      ),
                    ],
                  ),
                );
              }),
              pw.SizedBox(height: 12),
              // Total with divider
              pw.Divider(thickness: 1.5),
              pw.SizedBox(height: 12),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text(
                    "Total",
                    style: pw.TextStyle(
                      fontSize: 16,
                      fontWeight: pw.FontWeight.bold,
                    ),
                  ),
                  pw.Text(
                    "${balance.toInt()} FCFA",
                    style: pw.TextStyle(
                      fontSize: 16,
                      fontWeight: pw.FontWeight.bold,
                    ),
                  ),
                ],
              ),
              pw.SizedBox(height: 12),
              // Sub-total, Sales Tax, Balance
              _buildSummaryRow("Sub-total", "${subTotal.toInt()} FCFA"),
              pw.SizedBox(height: 6),
              _buildSummaryRow(
                "Dette courante",
                "${order.previousDebt.toInt()} FCFA",
              ),
              pw.SizedBox(height: 6),
              _buildSummaryRow("Montant payé", "${amountPaid.toInt()} FCFA"),
              pw.SizedBox(height: 6),
              _buildSummaryRow("Balance", "${balance.toInt()} FCFA"),
              pw.SizedBox(height: 30),
              // Footer
              pw.Text(
                "THANK YOU",
                style: pw.TextStyle(
                  fontSize: 18,
                  fontWeight: pw.FontWeight.bold,
                ),
                textAlign: pw.TextAlign.center,
              ),
              pw.SizedBox(height: 20),
            ],
          );
        },
      ),
    );

    return pdf;
  }

  static Future<Uint8List> generatePdfBytes({
    required OrderResponseModel order,
  }) async {
    final pdf = _generatePdf(order: order);
    return pdf.save();
  }

  static Future<void> generateAndPrintPdf({
    required OrderResponseModel order,
  }) async {
    final pdf = _generatePdf(order: order);

    await Printing.layoutPdf(
      onLayout: (PdfPageFormat format) async => pdf.save(),
    );
  }

  static pw.Widget _buildSummaryRow(String label, String value) {
    return pw.Row(
      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
      children: [
        pw.Text(label, style: pw.TextStyle(fontSize: 14)),
        pw.Text(value, style: pw.TextStyle(fontSize: 14)),
      ],
    );
  }
}
