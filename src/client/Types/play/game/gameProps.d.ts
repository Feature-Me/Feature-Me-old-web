import { chartType } from "Features/play/parseChart/chartSample"

interface gameProps {
    ready: boolean
    data: {
        chart: chartType |undefined
        music: musicData | undefined
    }
}