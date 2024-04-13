#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#define PORT 8080

int main() {
    int server_fd, new_socket;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);

    // Criando o descritor de arquivo do socket
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0) {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // Atribuindo a porta 12345 ao socket
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Anexando o socket à porta 12345
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) < 0) {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    if (listen(server_fd, 3) < 0) {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, (socklen_t*)&addrlen))<0) {
        perror("accept");
        exit(EXIT_FAILURE);
    }

    // Lendo o tamanho do arquivo
    unsigned long file_size;
    read(new_socket, &file_size, sizeof(file_size));
    file_size = ntohl(file_size); // Certifique-se de converter de network byte order para host byte order

    char* buffer = malloc(file_size);
    if (buffer == NULL) {
        perror("Failed to allocate memory");
        exit(EXIT_FAILURE);
    }

    // Lendo o arquivo
    read(new_socket, buffer, file_size);

    // Aqui você pode salvar o buffer em um arquivo ou processá-lo conforme necessário
    FILE* file = fopen("received_file.xlsx", "wb");
    fwrite(buffer, 1, file_size, file);
    fclose(file);

    printf("Arquivo recebido e salvo como 'received_file.xlsx'\n");

    close(new_socket);
    close(server_fd);
    free(buffer);
    return 0;
}
