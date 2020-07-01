class ShareService {
	share(url) {
		navigator.share({
			title: "Peer stream",
			url,
		});
	}
	
	copy(url) {
		navigator.clipboard.writeText(url);
	}
}
const shareService = new ShareService;
export default shareService;
