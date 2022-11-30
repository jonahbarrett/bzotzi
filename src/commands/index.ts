import { Command } from 'Command'
import { Choose } from '@commands/Choose'
// import { Hello } from "@commands/Hello";
import { VibeCheck } from './Vibecheck'
import { ChooseMulti } from './ChooseMulti'
import { YesNo } from './YesNo'

export const Commands: Command[] = [Choose, ChooseMulti, VibeCheck, YesNo]
