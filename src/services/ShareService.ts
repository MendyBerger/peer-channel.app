import * as clipboard from "clipboard-polyfill";

class ShareService {
	share(url: string) {
		navigator.share({
			title: "Peer stream",
			url,
		});
	}
	
	copy(url: string) {
		if("clipboard" in navigator)
			navigator.clipboard.writeText(url);
		else
			clipboard.writeText(url);
	}
}
const shareService = new ShareService;
export default shareService;
