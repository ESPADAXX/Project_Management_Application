//package server.security;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//import org.springframework.stereotype.Service;
//
//import java.security.Key;
//import java.util.Base64;
//
//@Service
//public class JwtService {
//    private static final String SECRET_KEY="610d508e9180e050251ae14636de5486";
//    public String extractUsername(String token) {
//        return null;
//    }
//    private Claims extractAllClaims(String token){
//        return Jwts
//                .parserBuilder()
//                .setSigningKey(getSignIngKey())
//                .build()
//                .parseClaimsJwt(token)
//                .getBody();
//    }
//
//    private Key getSignIngKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
//        return Keys.hmacShaKeyFor(keyBytes);
//
//    }
//
//}
