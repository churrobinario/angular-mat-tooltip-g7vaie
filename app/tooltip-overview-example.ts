import { Component, OnInit, ViewChild, ViewEncapsulation, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatPaginatorIntl, PageEvent, MatPaginator, Sort, MatDialog, TooltipPosition } from '@angular/material';
import { FormControl} from '@angular/forms';


export function CustomPaginator() {
    const customPaginatorIntl = new MatPaginatorIntl();

    customPaginatorIntl.itemsPerPageLabel = 'rows per page';

    return customPaginatorIntl;
}

enum alertType {
    Severe = 2,
    Moderate = 1,
    Low = 0
};

/**
 * @title Basic tooltip
 */
@Component({
  selector: 'tooltip-overview-example',
  templateUrl: 'tooltip-overview-example.html',
  styleUrls: ['tooltip-overview-example.css'],
  //encapsulation: ViewEncapsulation.None,
})
export class TooltipOverviewExample {
 pageSize = 8;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchText: any;
    pageSizeOptions: number[] = [8, 16, 24, 32];
    recordlength: any = 0;
    displayedColumns: string[] = ['Alert','Severity', 'Type', 'EnableDisableCheckbox', 'Log'];
    positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);
    displayNoRecord: boolean = false;
    alertsData: any = [];
    displayData: any = [];

    sites:any = [];

    constructor() {}

    data = 
    [
	{
		"_id": "5e4ef89f244537687c1e5748",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and air and voc and sensor",
				"value": "tuner and zone and voc and threshold",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "VOC ABOVE THRESHOLD WARN",
			"mMessage": "#equipname reports VOC level of #pointval above the threshold of #condval for 15 minutes",
			"mNotificationMsg": "#equipname reports VOC level of #pointval above the threshold of #condval for 15 minutes",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef8b6244537687c1e5750",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and air and voc and sensor",
				"value": "tuner and zone and voc and target",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "VOC ABOVE TARGET ERROR",
			"mMessage": "#equipname reports VOC level of #pointval above 10% of the target value #condval for 15 minutes",
			"mNotificationMsg": "#equipname reports VOC level of #pointval above 10% of the target value #condval for 15 minutes",
			"mSeverity": "MODERATE",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef8ca244537687c1e5758",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and current and temp",
				"value": "system and building and limit and min",
				"grpOperation": "equip",
				"condition": "<"
			},
			{
				"order": "2",
				"operator": "||"
			},
			{
				"order": "3",
				"key": "zone and current and temp",
				"value": "system and building and limit and max",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "BUILDING TEMP LIMIT BREACH",
			"mMessage": "The temperature in your zone #zoneName is #pointval1 which is  currently outside the defined building limit #condval1 - #condval3",
			"mNotificationMsg": "The temperature in your zone #zoneName is #pointval1 which is  currently outside the defined building limit #condval1 - #condval3",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e2530a2ee237b037fb5faec",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and air and co2 and sensor",
				"value": "tuner and zone and co2 and threshold",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "CO2 ABOVE THRESHOLD WARN",
			"mMessage": "#equipname reports CO2 level of #pointval above the threshold of #condval for 15 minutes",
			"mNotificationMsg": "#equipname reports CO2 level of #pointval above the threshold of #condval for 15 minutes",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef8ed244537687c1e5767",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and air and co2 and sensor",
				"value": "tuner and zone and co2 and target",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "CO2 ABOVE TARGET ERROR",
			"mMessage": "#equipname reports CO2 level of #pointval above 10% of the target value #condval for 15 minutes",
			"mNotificationMsg": "#equipname reports CO2 level of #pointval above 10% of the target value #condval for 15 minutes",
			"mSeverity": "MODERATE",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef984244537687c1e576f",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and air and co and sensor",
				"value": "tuner and zone and co and target",
				"grpOperation": "equip",
				"condition": ">"
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "CO ABOVE THRESHOLD WARN",
			"mMessage": "#equipname reports CO level of #pointval above the threshold of #condval for 15 minutes",
			"mNotificationMsg": "#equipname reports CO level of #pointval above the threshold of #condval for 15 minutes",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef996244537687c1e5777",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and current and temp",
				"value": "0",
				"grpOperation": "delta",
				"condition": "=="
			}
		],
		"offset": "15",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "CONSTANT CUR TEMP",
			"mMessage": "#equipname is reporting same temperature #presentVal for last #offsetVal minutes",
			"mNotificationMsg": "#equipname is reporting same temperature #presentVal for last #offsetVal minutes",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9a2244537687c1e577f",
		"conditionals": [
			{
				"order": "1",
				"key": "zone and current and temp",
				"value": "5",
				"grpOperation": "delta",
				"condition": ">"
			},
			{
				"order": "2",
				"operator": "||"
			},
			{
				"order": "3",
				"key": "zone and current and temp",
				"grpOperation": "delta",
				"value": "-5",
				"condition": "<"
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "ABNORMAL CUR TEMP",
			"mMessage": "#equipName reported a sudden change in current temperature. New temperature is #presentVal and previous temperature is #oldVal. If you continue to receive this alert, please contact",
			"mNotificationMsg": "#equipName reported a sudden change in current temperature. New temperature is #presentVal and previous temperature is #oldVal. If you continue to receive this alert, please contact",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9b1244537687c1e5787",
		"conditionals": [
			{
				"order": "1",
				"key": "diag and battery and level",
				"value": "20",
				"grpOperation": "",
				"condition": "<"
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "BATTERY LEVEL LOW FATAL",
			"mMessage": "The battery level of your CCU #ccuname has dropped below 20%% and is not charging. Please check that the tablet is secured to it's mount. if it is plugged in, please contact",
			"mNotificationMsg": "The battery level of your CCU #ccuname has dropped below 20%% and is not charging. Please check that the tablet is secured to it's mount. if it is plugged in, please contact",
			"mSeverity": "SEVERE",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9b9244537687c1e578f",
		"conditionals": [
			{
				"order": "1",
				"key": "mixed and air and temp and sensor",
				"value": "oao and outside and damper and mat and minimum",
				"grpOperation": "oao",
				"condition": "<"
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "MAT OUTSIDE RANGE",
			"mMessage": "The Mixed air Temperature in your Roof Top Unit is #pointval1 degrees which is lesser than the expected value #condval1",
			"mNotificationMsg": "The Mixed air Temperature in your Roof Top Unit is #pointval1 degrees which is lesser than the expected value #condval1",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9c2244537687c1e5797",
		"conditionals": [
			{
				"order": "1",
				"key": "password and attempt",
				"value": "10",
				"grpOperation": "security",
				"condition": ">="
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "INCORRECT PASSWORD ENTERED[ERROR]",
			"mMessage": "Incorrect password entered 10 times in a row. Please have your admin or security team check the intrusion.",
			"mNotificationMsg": "Incorrect password entered 10 times in a row. Please have your admin or security team check the intrusion.",
			"mSeverity": "MODERATE",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9cc244537687c1e579f",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "DEVICE LOW SIGNAL",
			"mMessage": "For %s, %s is having an issues and has reported low signal for last 50 updates. If you continue to receive this alert, please contact",
			"mNotificationMsg": "For %s, %s is having an issues and has reported low signal for last 50 updates. If you continue to receive this alert, please contact",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4ef9d6244537687c1e57a7",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "CM DEAD",
			"mMessage": "For %s, %s has stopped reporting data. Please contact",
			"mNotificationMsg": "For %s, %s has stopped reporting data. Please contact",
			"mSeverity": "SEVERE",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4ef9e0244537687c1e57af",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "DEVICE DEAD",
			"mMessage": "For %s, %s has stopped reporting data. Please contact",
			"mNotificationMsg": "For %s, %s has stopped reporting data. Please contact",
			"mSeverity": "MODERATE",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4ef9e7244537687c1e57b7",
		"conditionals": [
			{
				"order": "1",
				"key": "diag and app and restart",
				"value": "1",
				"grpOperation": "",
				"condition": "=="
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "CCU RESTART",
			"mMessage": "The CCU is restarted",
			"mNotificationMsg": "The CCU is restarted",
			"mSeverity": "INTERNAL_INFO",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4ef9f5244537687c1e57bf",
		"conditionals": [
			{
				"order": "1",
				"key": "password and attempt",
				"value": "3",
				"grpOperation": "security",
				"condition": ">="
			}
		],
		"offset": "0",
		"alert": {
			"mAlertType": "CUSTOMER VISIBLE",
			"mTitle": "INCORRECT PASSWORD ENTERED[WARN]",
			"mMessage": "Incorrect password entered 3 times in a row. Please have your admin or security team check the intrusion.",
			"mNotificationMsg": "Incorrect password entered 3 times in a row. Please have your admin or security team check the intrusion.",
			"mSeverity": "LOW",
			"mEnabled": "true"
		},
		"custom": false
	},
	{
		"_id": "5e4efa02244537687c1e57c7",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "CM RESET",
			"mMessage": "CM Reset request sent for %s",
			"mNotificationMsg": "CM Reset request sent for %s",
			"mSeverity": "INTERNAL_INFO",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4efa0d244537687c1e57cf",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "DEVICE RESTART COMMAND",
			"mMessage": "Command sent for Device restart",
			"mNotificationMsg": "Command sent for Device restart",
			"mSeverity": "INTERNAL_INFO",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4efa16244537687c1e57d7",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "DEVICE REBOOT",
			"mMessage": "Device reboot info - %s",
			"mNotificationMsg": "Device reboot info - %s",
			"mSeverity": "INTERNAL_LOW",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4efa1d244537687c1e57df",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "FIRMWARE OTA UPDATE STARTED",
			"mMessage": "Firmware OTA update for %s started for smart node %d with version %s",
			"mNotificationMsg": "Firmware OTA update for %s started for smart node %d with version %s",
			"mSeverity": "INTERNAL_INFO",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4efa26244537687c1e57e7",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "FIRMWARE OTA UPDATE ENDED",
			"mMessage": "Firmware OTA update for %s ended for smart node %d with version %s",
			"mNotificationMsg": "Firmware OTA update for %s ended for smart node %d with version %s",
			"mSeverity": "INTERNAL_INFO",
			"mEnabled": "true"
		},
		"custom": false,
		"offset": "0"
	},
	{
		"_id": "5e4efa2e244537687c1e57ef",
		"conditionals": [
			{
				"order": "1",
				"key": "",
				"value": "",
				"grpOperation": "alert",
				"condition": ""
			}
		],
		"alert": {
			"mAlertType": "CUSTOMER INVISIBLE",
			"mTitle": "CM ERROR REPORT",
			"mMessage": "CM error: %s",
			"mNotificationMsg": "CM error: %s",
			"mSeverity": "INTERNAL_MODERATE",
			"mEnabled": "false"
		},
		"custom": false,
		"offset": "0"
	}
]

    ngOnInit() {
        
        this.fetchAlertData(this.data)
    }

    fetchAlertData(data){
        this.displayNoRecord = false;
        this.alertsData = [];
        this.displayData = [];

        // this.siteService.fetchData().subscribe(
        //     (data) => {
              console.log(data);
              data.forEach(element => {
                let elementobj = {};

                switch (element.alert.mSeverity) {
                    case 'SEVERE':
                        elementobj["severitytype"] = alertType.Severe;
                        break;
                    case 'MODERATE':
                        elementobj["severitytype"] = alertType.Moderate;
                        break;
                    case 'LOW':
                        elementobj["severitytype"] = alertType.Low;
                        break;
                }

                elementobj["Alert"] = element.alert.mMessage;
                let toolTipObj = {
                    "conditionals": element.conditionals,
                    "offset": element.offset,
                    "alert": element.alert
                }
                elementobj["conditionals"] = toolTipObj;
                elementobj["type"] = element.alert.mAlertType;
                elementobj["enabledisablecheckbox"] = element.alert.mEnabled;

                console.log(elementobj)

                this.alertsData.push(elementobj);
              });

              this.displayData = Array.from(this.alertsData);
            //})
    }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */