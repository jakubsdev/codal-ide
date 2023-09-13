const code = `#include "MicroBit.h"

MicroBit uBit;

int main()
{
    // Initialise MicroBit object
    uBit.init();

    while(1)
        uBit.display.scroll("Hello!");
}`;

export default code;
