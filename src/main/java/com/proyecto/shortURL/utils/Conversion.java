package com.proyecto.shortURL.utils;

import org.springframework.stereotype.Service;

@Service
public class Conversion {

    private static final String base62 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final char[] allowedCharacters = base62.toCharArray();

    public String encodeUrl(long value) {
        var shortString = new StringBuilder();

        if (value == 0) {
            return String.valueOf(allowedCharacters[0]);
        }

        while (value > 0) {
            shortString.append(allowedCharacters[(int) (value % 62)]);
            value /= 62;
        }

        return shortString.reverse().toString();
    }

}

