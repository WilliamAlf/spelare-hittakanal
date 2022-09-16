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
        playerRole = "Seeker"
    } else if (receivedString == "Hider") {
        playerRole = "Hider"
    } else if (receivedString == "StartGame") {
        gameIsRunning = 1
        radio.setGroup(113)
        if (playerRole == "Seeker") {
            basic.showString(playerRole)
            signalStrength = radio.receivedPacket(RadioPacketProperty.SignalStrength)
            led.plotBarGraph(
            Math.map(signalStrength, -95, -42, 0, 9),
            9
            )
        } else if (playerRole == "Hider") {
            basic.showString(playerRole)
            radio.setTransmitPower(7)
            basic.showString("Find Me")
            while (gameIsRunning == 1) {
                radio.sendString("FindMe")
            }
        }
    } else if (receivedString == "FindMe") {
        signalStrength = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        led.plotBarGraph(
        Math.map(signalStrength, -95, -42, 0, 9),
        9
        )
    } else if (receivedString == "testWinner") {
        if (playerRole != "Hider" && input.buttonIsPressed(Button.B)) {
            gameIsRunning = 0
            radio.setGroup(120)
            radio.sendNumber(1337)
            radio.sendNumber(1337)
            radio.sendNumber(1337)
            radio.setGroup(0)
            while (true) {
                basic.showString("Winner!")
            }
        }
    } else if (receivedString == "stopGame") {
        gameIsRunning = 0
        while (true) {
            basic.showString("Game Over")
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    if (playerRole != "Seeker" && gameIsRunning == 1) {
        for (let index = 0; index < 10; index++) {
            radio.sendString("testWinner")
            basic.pause(100)
        }
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
    playerRole = "undefined"
    signalStrength = 0
    gameIsRunning = 0
}
let signalStrength = 0
let gameIsRunning = 0
let playerRole = ""
let kanal = 0
let hittatKanal = 0
let ID = 0
let kanaler: number[] = []
basic.showIcon(IconNames.SmallDiamond)
initiateVariables()
