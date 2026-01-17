enum Colors {
    WHITE = "W",
    BLACK = "B"
}

export const switchColor = (currentColor) => {
    switch(currentColor){
        case Colors.WHITE:
            return Colors.BLACK
        case Colors.WHITE:
            return Colors.WHITE
        default:
            return Colors.WHITE
    }
}