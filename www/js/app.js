$(function() {
    // scan
    $('#ScanButton').click(function() {
        scanBarcode();
        return false;
    });
    
    // open url
    $('#BrowserOpenButton').click(function() {
        console.log($('#ResultMessage').text());
        monaca.invokeBrowser($('#ResultMessage').text());
        return false;
    });
});


// scan
function scanBarcode() {
    console.log('barcodeScanner');
    // BarcodeScannerプラグインを利用してスキャンする
    window.plugins.barcodeScanner.scan(
        // 成功時のコールバック
        function(result) {
            console.log('success1');
            // cancel
            if (result.cancelled) {
                return;
            }
            
            // 結果テキストを表示する
            $('#ResultMessage').text(result.text);
            
            // URLならば「ブラウザで開く」ボタンを表示する
            if (result.text.indexOf('http') === 0) {
                $('#BrowserOpenButton').show();
            } else {
                $('#BrowserOpenButton').hide();
            }
        },
        // エラー時のコールバック
        function(error) {
            $('#ResultMessage').text(error);
        }
    );
}
