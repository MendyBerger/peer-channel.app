class ShareService {
	share(e) {
		navigator.share({
			
		});
	}
	
	copy(e) {
		navigator.clipboard.writeText("text");
	}
}
const shareService = new ShareService;
export default shareService;
