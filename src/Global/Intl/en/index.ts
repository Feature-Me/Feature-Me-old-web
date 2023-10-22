import type { Translation } from '../i18n-types.js'
import Global from './Global/Global.js'
import Splash from './Scenes/Splash/Splash.js'
import Title from './Scenes/Title/Title.js'

const en = {
    hello: "Hello",
    Scenes: {
        Splash,
        Title
    },
    Global
} satisfies Translation

export default en
