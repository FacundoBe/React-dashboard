// TradingViewWidget.jsx
import { useEffect, useRef, memo } from 'react';
import { useParams } from "react-router"
import './TradingViewWidget.css'


function TradingViewWidget() {
    const container = useRef();

    let params = useParams()
    console.log(params.symbol)
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "lineWidth": 2,
          "lineType": 0,
          "chartType": "area",
          "fontColor": "rgb(106, 109, 120)",
          "gridLineColor": "rgba(242, 242, 242, 0.06)",
          "volumeUpColor": "rgba(34, 171, 148, 0.5)",
          "volumeDownColor": "rgba(247, 82, 95, 0.5)",
          "backgroundColor": "rgba(0, 0, 0, 0.0)",
          "widgetFontColor": "#DBDBDB",
          "upColor": "#22ab94",
          "downColor": "#f7525f",
          "borderUpColor": "#22ab94",
          "borderDownColor": "#f7525f",
          "wickUpColor": "#22ab94",
          "wickDownColor": "#f7525f",
          "colorTheme": "dark",
          "isTransparent": false,
          "locale": "en",
          "chartOnly": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "symbols": [
            [
              "",
              "${params.symbol}USD|3M"
            ]
          ],
          "dateRanges": [
            "1d|1",
            "1m|30",
            "3m|60",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "fontSize": "10",
          "headerFontSize": "medium",
          "autosize": true,
          "width": "100%",
          "height": "100%",
          "noTimeScale": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false
        }`;
            container.current.appendChild(script);
        },
        [params.symbol]
    );

    return (
        <div className='tradingview-widget-external-container'>
            <div className="tradingview-widget-container" ref={container} >
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
                    <span className="grey-text">Track all markets on TradingView</span> </a>
                </div>
            </div>
        </div>
    );
}

export default memo(TradingViewWidget);
