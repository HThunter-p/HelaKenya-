import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(
        title: 'HelaKenya',
        home: DepositScreen(),
      );
}

class DepositScreen extends StatefulWidget {
  @override
  _DepositScreenState createState() => _DepositScreenState();
}

class _DepositScreenState extends State<DepositScreen> {
  final _phoneController = TextEditingController();
  final _amountController = TextEditingController();
  String _result = "";

  Future<void> _makeDeposit() async {
    final phone = _phoneController.text.trim();
    final amount = _amountController.text.trim();
    final url = 'https://yourbackend.com/api/stkpush'; // <-- Update to your actual backend URL
    final res = await http.post(
      Uri.parse(url),
      headers: {'Content-Type': 'application/json'},
      body: '{"phone":"$phone","amount":$amount}',
    );
    setState(() {
      _result = res.body;
    });
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          title: Text('Deposit via STK Push'),
          leading: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Image.asset('assets/icons/helakenya_icon.png'),
          ),
        ),
        body: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            children: [
              TextField(
                controller: _phoneController,
                decoration: InputDecoration(labelText: 'Phone Number'),
              ),
              TextField(
                controller: _amountController,
                decoration: InputDecoration(labelText: 'Amount'),
                keyboardType: TextInputType.number,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _makeDeposit,
                child: Text('Deposit'),
              ),
              SizedBox(height: 20),
              Text(_result),
            ],
          ),
        ),
      );
}
