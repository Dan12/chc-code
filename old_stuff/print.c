#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
  int* address[4];
  address[1] = 4;
  printf("variable A is at address: %d\n", *address);
  printf("variable A is at address: %d\n", *(address+1));
  printf("variable A is at address: %d\n", *(address+2));
  printf("variable A is at address: %d\n", *(address+3));
}
