package com.oekor.kaeltemittelrechner

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBars
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowInsetsControllerCompat


class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Set the status bar background to white (or another light color)
        window.statusBarColor = android.graphics.Color.WHITE

        // Set status bar icons to black (dark)
        WindowInsetsControllerCompat(window, window.decorView)
            .isAppearanceLightStatusBars = true

        setContent {
            AndroidView(
                factory = { context ->
                    // The WebView is created here. Configure it directly.
                    WebView(context).apply {
                        webViewClient = WebViewClient() // Prevents links from opening in an external browser

                        // Access the settings of this WebView to enable features
                        settings.javaScriptEnabled = true
                        settings.domStorageEnabled = true // This is the key part for localStorage

                        // Load your local HTML file
                        // Make sure your web files are in the 'app/src/main/assets' folder
                        loadUrl("file:///android_asset/index.html")
                    }
                },
                modifier = Modifier
                    .fillMaxSize()
                    .padding(WindowInsets.statusBars.asPaddingValues())
            )
        }
    }
}

