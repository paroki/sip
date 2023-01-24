fos.Router.setData({"base_url":"","routes":{"api_genid":{"tokens":[["variable","\/","[^\/]++","id",true],["text","\/.well-known\/genid"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"api_entrypoint":{"tokens":[["variable",".","[^\/]++","_format",true],["variable","\/","index","index",true]],"defaults":{"_format":"","index":"index"},"requirements":{"index":"index"},"hosttokens":[],"methods":[],"schemes":[]},"api_doc":{"tokens":[["variable",".","[^\/]++","_format",true],["text","\/docs"]],"defaults":{"_format":""},"requirements":[],"hosttokens":[],"methods":[],"schemes":[]},"api_jsonld_context":{"tokens":[["variable",".","jsonld","_format",true],["variable","\/","[^.]+","shortName",true],["text","\/contexts"]],"defaults":{"_format":"jsonld"},"requirements":{"shortName":"[^.]+","_format":"jsonld"},"hosttokens":[],"methods":[],"schemes":[]},"_api_\/user{._format}_get_collection":{"tokens":[["variable",".","[^\/]++","_format",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"_api_\/user{._format}_post":{"tokens":[["variable",".","[^\/]++","_format",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"_api_\/user\/{id}{._format}_get":{"tokens":[["variable",".","[^\/]++","_format",true],["variable","\/","[^\/\\.]++","id",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"_api_\/user\/{id}{._format}_put":{"tokens":[["variable",".","[^\/]++","_format",true],["variable","\/","[^\/\\.]++","id",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["PUT"],"schemes":[]},"_api_\/user\/{id}{._format}_patch":{"tokens":[["variable",".","[^\/]++","_format",true],["variable","\/","[^\/\\.]++","id",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["PATCH"],"schemes":[]},"_api_\/user\/{id}{._format}_delete":{"tokens":[["variable",".","[^\/]++","_format",true],["variable","\/","[^\/\\.]++","id",true],["text","\/user"]],"defaults":{"_format":null},"requirements":[],"hosttokens":[],"methods":["DELETE"],"schemes":[]},"auth_login":{"tokens":[["text","\/auth\/login"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"auth_change_password":{"tokens":[["text","\/auth\/change-password"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["POST"],"schemes":[]},"auth_check_token":{"tokens":[["text","\/auth\/check"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"auth_logout":{"tokens":[["text","\/auth\/logout"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]},"auth_profile":{"tokens":[["text","\/auth\/profile"]],"defaults":[],"requirements":[],"hosttokens":[],"methods":["GET"],"schemes":[]}},"prefix":"","host":"localhost","port":"","scheme":"http","locale":""});