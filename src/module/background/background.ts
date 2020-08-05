import {PiHoleApiService} from "../../service/api/service/PiHoleApiService";
import {BadgeService, ExtensionBadgeText} from "../../service/browser/BadgeService";
import {PiHoleApiStatus, PiHoleApiStatusEnum} from "../../service/api/models/pihole/PiHoleApiStatus";
import {LinkConfig} from "../../service/browser/i18nService";


chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install")
	{
		console.log("This is a first install!");
	}
	else if (details.reason == "update" && details.previousVersion)
	{
		const previousVersion = Number(details.previousVersion.split('.').join(''));
		const thisVersion = Number(chrome.runtime.getManifest().version.split('.').join(''));
		console.log("Updated from " + previousVersion + " to " + thisVersion + "!");
	}
});

// Hook to show a survey after uninstalling the extension
chrome.runtime.setUninstallURL(LinkConfig.uninstall_survey);

/**
 * Background Service
 * Initialises the pihole domain, checks the pihole status.
 */
checkStatus().then();  //Get the current status when the browser opens
window.setInterval(checkStatus, 15000); //Keep checking every 15 seconds

/**
 * Checking the current status of the pihole
 *
 */
async function checkStatus(): Promise<void>
{
	const success_callback = (data: PiHoleApiStatus) => {
		BadgeService.get_badge_text().then(function(result) {
			if (!(BadgeService.compare_badge_to_api_status(result, data.status)))
			{
				if (data.status === PiHoleApiStatusEnum.disabled)
				{
					BadgeService.set_badge_text(ExtensionBadgeText.disabled);
				}
				else if (data.status === PiHoleApiStatusEnum.enabled)
				{
					BadgeService.set_badge_text(ExtensionBadgeText.enabled);
				}
			}
		})
	};
	PiHoleApiService.refresh_pi_hole_status(success_callback).then();
}
