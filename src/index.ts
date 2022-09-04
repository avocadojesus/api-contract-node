// importing this file will automatically extend jest
import './extensions/jest'

import _expectFullCompliance from './extensions/jest/expectFullCompliance'
export const expectFullCompliance = _expectFullCompliance
