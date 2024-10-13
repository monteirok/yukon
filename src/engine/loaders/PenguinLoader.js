import PenguinSpriteFactory from './PenguinSpriteFactory'


export default class PenguinLoader {

    constructor(world) {
        this.world = world

        this.nameStyle = {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#000000',
            align: 'center',
            fixedWidth: 250
        }
    }

    loadPenguin(penguin) {
        this.addPenguin(penguin)
        this.addShadow(penguin)
        this.addInput(penguin)

        penguin.playFrame(penguin.frame)
    }

    addPenguin(penguin) {
        penguin.bodySprite = PenguinSpriteFactory.create(penguin, 'body', 1)
        penguin.penguinSprite = PenguinSpriteFactory.create(penguin, 'penguin', 2)
    }

    addShadow(penguin) {
        let shadow = penguin.room.add.image(0, 0, 'penguin_base', 'shadow')

        penguin.addAt(shadow, 0)
    }

    addRing(penguin) {
        let ring = penguin.room.add.image(0, 0, 'penguin_base', 'ring')

        penguin.addAt(ring, 0)
    }

    addName(penguin) {
        let x = penguin.x
        let y = penguin.y + 40

        let nameStyle = {
            fontFamily: 'Burbank Small',
            fontSize: 24,
            color: '#161616',
            align: 'center',
            fixedWidth: 250
        }

        // Check if the penguin is the client
        if (penguin.id === this.world.client.id) {
            // Add stroke to the name style for the client
            nameStyle = { ...nameStyle, color: "#fefefe", stroke: '#161616', strokeThickness: 8 };
            // nameStyle = { ...nameStyle, color: "#fefefe", stroke: '#161616', strokeThickness: 8 };
        }

        let nameTag = penguin.room.add.text(x, y, penguin.username, nameStyle)

        nameTag.setOrigin(0.5)
        nameTag.depth = penguin.depth + 2000

        return nameTag
    }

    addInput(penguin) {
        let hitArea = new Phaser.Geom.Ellipse(0, -20, 70, 90)

        penguin.setInteractive({
            cursor: 'pointer',
            hitArea: hitArea,
            hitAreaCallback: Phaser.Geom.Ellipse.Contains
        })

        penguin.on('pointerup', () => this.onPenguinClick(penguin.id))
    }

    onPenguinClick(id) {
        this.world.interface.showCard(id)
    }

}
