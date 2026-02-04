import 'package:flutter/material.dart';
import 'package:fopa_sop_apk/cores/app_theme.dart';
import 'package:fopa_sop_apk/cores/size_config.dart';
import 'package:fopa_sop_apk/cores/widget/extensions.dart';
import 'package:fopa_sop_apk/cores/widget/simple_text.dart';
import 'package:fopa_sop_apk/cores/widget/textfield_app.dart';
import 'package:fopa_sop_apk/features/feat_customer/datas/models/customer_response_model.dart';
import 'package:fopa_sop_apk/features/feat_customer/presentations/controllers/customer_provider.dart';
import 'package:provider/provider.dart';
// import 'package:fopa_sop_apk/features/feat_order/datas/models/fake_order.dart';

class CustomerSearchComponent extends StatelessWidget {
  final CustomerResponseModel? selectedCustomer;
  final ValueChanged<CustomerResponseModel?> onChanged;

  const CustomerSearchComponent({
    super.key,
    required this.selectedCustomer,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SimpleText(
          text: "Choisir le Client",
          size: 14,
          color: context.titleLargeColor,
        ),
        spacerHeight(8),
        _CustomerSearchDropdown(
          selectedCustomer: selectedCustomer,
          onChanged: onChanged,
        ),
      ],
    );
  }
}

class _CustomerSearchDropdown extends StatefulWidget {
  final CustomerResponseModel? selectedCustomer;
  final ValueChanged<CustomerResponseModel?> onChanged;

  const _CustomerSearchDropdown({
    required this.selectedCustomer,
    required this.onChanged,
  });

  @override
  State<_CustomerSearchDropdown> createState() =>
      _CustomerSearchDropdownState();
}

class _CustomerSearchDropdownState extends State<_CustomerSearchDropdown> {
  final _searchController = TextEditingController();
  bool _isOpen = false;
  List<CustomerResponseModel> _filteredCustomers = [];

  @override
  void initState() {
    super.initState();
    _filteredCustomers = context.read<CustomerProvider>().localCustomers;
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterCustomers(String query) {
    setState(() {
      if (query.isEmpty) {
        _filteredCustomers = context.read<CustomerProvider>().localCustomers;
      } else {
        _filteredCustomers = context
            .read<CustomerProvider>()
            .localCustomers
            .where(
              (customer) =>
                  (customer.user?.name ?? '').toLowerCase().contains(
                    query.toLowerCase(),
                  ) ||
                  (customer.user?.phone ?? '').contains(query),
            )
            .toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: () {
            setState(() {
              _isOpen = !_isOpen;
            });
          },
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: context.tertiary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: SimpleText(
                    text:
                        widget.selectedCustomer?.user?.name ??
                        "Sélectionnez un client",
                    color: widget.selectedCustomer != null
                        ? context.titleLargeColor
                        : context.titleLargeColor.withAppOppacity(0.5),
                  ),
                ),
                Icon(
                  _isOpen ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                  color: context.titleLargeColor,
                ),
              ],
            ),
          ),
        ),
        if (_isOpen) ...[
          spacerHeight(8),
          Column(
            children: [
              Padding(
                padding: EdgeInsets.symmetric(vertical: 8),
                child: TextFieldApp(
                  controller: _searchController,
                  hintText: "Rechercher...",
                  radius: 8,
                  prefixIcon: Icon(Icons.search),
                  onchange: _filterCustomers,
                ),
              ),
              Container(
                constraints: BoxConstraints(maxHeight: 200),
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  color: context.tertiary,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: ListView.separated(
                  shrinkWrap: true,
                  separatorBuilder: (context, index) {
                    return Divider(
                      color: context.titleLargeColor,
                      thickness: 1,
                    );
                  },
                  itemCount: _filteredCustomers.length,
                  itemBuilder: (context, index) {
                    final customer = _filteredCustomers[index];
                    return ListTile(
                      contentPadding: EdgeInsets.zero,
                      minLeadingWidth: 0,
                      minTileHeight: 0,
                      visualDensity: VisualDensity.compact,
                      title: SimpleText(
                        text: customer.user?.name ?? '',
                        size: 20,
                        color: context.titleLargeColor,
                      ),
                      subtitle: SimpleText(text: customer.user?.phone ?? ''),
                      onTap: () {
                        widget.onChanged(customer);
                        setState(() {
                          _isOpen = false;
                          _searchController.clear();
                          _filteredCustomers = context
                              .read<CustomerProvider>()
                              .localCustomers;
                        });
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        ],
      ],
    );
  }
}
