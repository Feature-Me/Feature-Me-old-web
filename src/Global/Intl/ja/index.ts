import type { BaseTranslation } from '../i18n-types.js'
import Global from '../en/Global/Global.js'
import Splash from './Scenes/Splash/Splash.js'
import Title from './Scenes/Title/Title.js'

const ja = {
	hello:"こんにちは",
    Scenes:{
        Splash,
        Title
    },
    Global
} satisfies BaseTranslation

export default ja
