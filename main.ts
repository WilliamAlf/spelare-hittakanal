function findEmptyPort () {
    for (let value of kanaler) {
        radio.setGroup(value)
        radio.sendString("" + (ID))
        basic.pause(200)
        if (hittatKanal == 1) {
            kanal = value
            break;
        }
    }
    radio.setGroup(kanal)
    basic.showNumber(kanal)
}
input.onButtonPressed(Button.A, function () {
    if (hittatKanal == 0) {
        findEmptyPort()
    }
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "All") {
        basic.showString(receivedString)
    } else if (receivedString == "Chosen") {
        basic.showString(receivedString)
    } else if (receivedString == "ChannelFound") {
        hittatKanal = 1
    } else if (receivedString == "Seeker") {
        basic.showString(receivedString)
    } else if (receivedString == "Hider") {
        basic.showString(receivedString)
    } else {
    	
    }
})
function initiateVariables () {
    hittatKanal = 0
    kanaler = [
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120
    ]
    ID = control.deviceSerialNumber()
}
let kanal = 0
let hittatKanal = 0
let ID = 0
let kanaler: number[] = []
basic.showIcon(IconNames.SmallDiamond)
initiateVariables()
basic.forever(function () {
	
})
