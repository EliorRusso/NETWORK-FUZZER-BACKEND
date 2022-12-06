#include "json.h"
#include "json.c"
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
char arr[30][30] = {""};
int arrindex = 0;
int maxdepth = 0;
static void print_depth_shift(int depth)
{
        int j;
        for (j=0; j < depth; j++) {
                printf(" ");
        }
}

static void process_value(json_value* value, int depth);

static void process_object(json_value* value, int depth)
{   
        int length, x;
        if (value == NULL) {
                return;
        }
        length = value->u.object.length;
        for (x = 0; x < length; x++) {
                print_depth_shift(depth);
                printf("object[%d].name = %s\n", x, value->u.object.values[x].name);
                maxdepth = x;
                arrindex++;
                process_value(value->u.object.values[x].value, depth+1);

        }
}

static void process_array(json_value* value, int depth)
{
        int length, x;
        if (value == NULL) {
                return;
        }
        length = value->u.array.length;
        printf("array\n");
        for (x = 0; x < length; x++) {
                process_value(value->u.array.values[x], depth);
        }
}

static void process_value(json_value* value, int depth)
{

        if (value->type != json_object) {
                print_depth_shift(depth);
        }
        switch (value->type) {
                case json_none:
                        printf("none\n");
                        break;
                case json_null:
                        printf("null\n");
                        break;
                case json_object:
                        process_object(value, depth+1);
                        break;
                case json_array:
                        process_array(value, depth+1);
                        break;
                case json_integer:
                        printf("int: %10ld\n", (long)value->u.integer);
                        break;
                case json_double:
                        printf("double: %f\n", value->u.dbl);
                        break;
                case json_string:
                        printf("string: %s\n", value->u.string.ptr);
                        strcpy(arr[arrindex], value->u.string.ptr);
                        
                        break;
                case json_boolean:
                        printf("bool: %d\n", value->u.boolean);
                        break;
        }
}

int main(int argc, char** argv)
{
        char* filename;
        FILE *fp;
        struct stat filestatus;
        int file_size;
        char* file_contents;
        json_char* json;
        json_value* value;
        filename = "protocol.json";

        if ( stat(filename, &filestatus) != 0) {
                fprintf(stderr, "File %s not found\n", filename);
                return 1;
        }
        file_size = filestatus.st_size;
        file_contents = (char*)malloc(filestatus.st_size);
        if ( file_contents == NULL) {
                fprintf(stderr, "Memory error: unable to allocate %d bytes\n", file_size);
                return 1;
        }

        fp = fopen(filename, "rt");
        if (fp == NULL) {
                fprintf(stderr, "Unable to open %s\n", filename);
                fclose(fp);
                free(file_contents);
                return 1;
        }
        if ( fread(file_contents, file_size, 1, fp) != 1 ) {
                fprintf(stderr, "Unable to read content of %s\n", filename);
                fclose(fp);
                free(file_contents);
                return 1;
        }
        fclose(fp);

        json = (json_char*)file_contents;

        value = json_parse(json,file_size);
        if (value == NULL) {
                fprintf(stderr, "Unable to parse data\n");
                free(file_contents);
                exit(1);
        }
        process_value(value, 0);
        FILE *fptr, *fptr2;
        fptr = fopen("/home/elior/Fuzzer/Mutate/webinfo.h","w");
        fptr2 = fopen("/home/elior/Fuzzer/Mutate/InfoForProtocol.txt", "w");
        //fptr = fopen("t.h", "w");
        if(fptr == NULL)
        {
            printf("Error!");   
            exit(1);             
        }
        fprintf(fptr, "int datafromuser[100] = {");
        fprintf(fptr, "%s\n", arr[2]);
        int c = atoi(arr[2]);
        int counter = 0;
        for(int j = 0; j < 50; j+=1){
                fprintf(fptr2, "%s\n", arr[j]);
        };
        for(int i = 5; i < c*4 + 4; i+=4){
                fprintf(fptr, ", %s", arr[i]);
                fprintf(fptr, ", %s", arr[i+1]);
        }       
        // for(int i = 4; i < 1+c*3 + 7; i+=1){
        //     counter++;
        //     if(counter % 4 == 0){
        //         continue;
        //     }
        //     if(arr[i] == NULL){
        //         break;
        //     }
        //     fprintf(fptr, ",%s", arr[i]);
        // }
        fprintf(fptr, "};");

        json_value_free(value);
        free(file_contents);
        return 0;
}