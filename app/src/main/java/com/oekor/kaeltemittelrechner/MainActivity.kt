package com.oekor.kaeltemittelrechner

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.core.net.toUri
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
                        // Standard WebViewClient
                        webViewClient = WebViewClient()

                        // Enable JavaScript and allow window opening
                        settings.javaScriptEnabled = true
                        settings.javaScriptCanOpenWindowsAutomatically = true
                        settings.setSupportMultipleWindows(true)
                        settings.domStorageEnabled = true

                        // Set WebChromeClient to handle `window.open`
                        webChromeClient = object : android.webkit.WebChromeClient() {
                            @Deprecated("Deprecated in Java")
                            override fun onCreateWindow(
                                view: WebView?,
                                isDialog: Boolean,
                                isUserGesture: Boolean,
                                resultMsg: android.os.Message?
                            ): Boolean {
                                val newWebView = WebView(context)
                                newWebView.webViewClient = object : WebViewClient() {
                                    @Deprecated("Deprecated in Java")
                                    override fun shouldOverrideUrlLoading(
                                        view: WebView,
                                        url: String
                                    ): Boolean {
                                        val browserIntent = android.content.Intent(android.content.Intent.ACTION_VIEW, url.toUri())
                                        context.startActivity(browserIntent)
                                        return true
                                    }
                                }
                                val transport = resultMsg?.obj as WebView.WebViewTransport
                                transport.webView = newWebView
                                resultMsg.sendToTarget()
                                return true
                            }
                        }

                        // Load your local HTML file
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

